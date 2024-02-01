import { Role } from '@prisma/client';
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import authConfig from './auth.config';
import { prisma } from './lib/prisma';
import {
  AccountService,
  TwoFactorConfirmationService,
  UserService,
} from './services';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  debug: process.env.NODE_ENV === 'development',
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  // secret: config.nextAuthSecret,
  callbacks: {
    async signIn({ user, account }) {
      console.log('SIGNIN: ', user, account);
      // Allow OAuth without email verification
      if (account?.provider !== 'credentials') return true;

      const existingUser = await UserService.findById(user.id);

      // Prevent sign in without email verification
      if (!existingUser?.emailVerified) return false;

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation =
          await TwoFactorConfirmationService.findByUser(existingUser.id);

        if (!twoFactorConfirmation) return false;

        // Delete two factor confirmation for next sign in.
        await TwoFactorConfirmationService.remove(twoFactorConfirmation.id);
      }

      return true;
    },
    async session({ token, session }) {
      console.log('SESSION: ', token, session);
      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.isOAuth = token.isOAuth as boolean;
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;

        if (token.sub) {
          session.user.id = token.sub;
        }

        if (token.roles) {
          session.user.roles = token.roles as Role[];
        }
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await UserService.findById(token.sub);
      if (!existingUser) return token;

      const existingAccount = await AccountService.findByUser(existingUser.id);

      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.roles = existingUser.roles;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

      return token;
    },
  },
  pages: {
    signIn: '/auth',
    error: '/auth/error',
  },
  events: {
    async linkAccount({ user }) {
      await UserService.update({ id: user.id }, { emailVerified: new Date() });
    },
  },
  ...authConfig,
});

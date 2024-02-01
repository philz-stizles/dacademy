import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import type { NextAuthConfig } from 'next-auth';
import config from '@/utils/constants';
import { AuthService, EmailService, TokenService } from '@/services';
import { registerSchema } from '@/schemas';
import ApiError from './error/api-error';

export default {
  providers: [
    Github({
      clientId: config.githubClientId,
      clientSecret: config.githubClientSecret,
    }),
    Google({
      clientId: config.googleClientId,
      clientSecret: config.googleClientSecret,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = registerSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await AuthService.signin(email, password);
          console.log(user);

          if (!user.emailVerified) {
            const verificationToken = await TokenService.generateVerification(
              user.email
            );

            await EmailService.sendVerificationEmail(
              verificationToken.email,
              verificationToken.token
            );

            throw new ApiError('Please confirm your email to login', 400);
          }

          // If you return null or false then the credentials will be rejected
          // You can also Reject this callback with an Error or with a URL:
          // throw new Error('error message') // Redirect to error page
          // throw '/path/to/redirect'        // Redirect to a URL

          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
} satisfies NextAuthConfig;

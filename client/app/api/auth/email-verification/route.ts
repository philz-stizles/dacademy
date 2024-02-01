import ApiError from '@/error/api-error';
import {
  TokenService,
  UserService,
  VerificationTokenService,
} from '@/services';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    const existingToken = await VerificationTokenService.findByToken(token);
    if (!existingToken) {
      throw new ApiError('Token does not exist!', 400);
    }

    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired) {
      throw new ApiError('Token has expired!', 400);
    }

    const existingUser = await UserService.findByEmail(existingToken.email);
    if (!existingUser) {
      throw new ApiError('Email does not exist!', 400);
    }

    await UserService.update(
      { id: existingUser.id },
      {
        emailVerified: new Date(),
        email: existingToken.email,
      }
    );

    await VerificationTokenService.remove(existingToken.id);

    return Response.json({
      status: true,
      message: 'Email verified!',
    });
  } catch (error) {
    console.error('Error in POST request:', error);
    if (error instanceof ApiError) {
      return new Response(
        JSON.stringify({ status: false, message: error.message }),
        { status: error.statusCode }
      );
    } else {
      return new NextResponse(null, { status: 500 });
    }
  }
}

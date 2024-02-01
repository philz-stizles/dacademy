import ApiError from '@/error/api-error';
import { AuthService, EmailService, TokenService } from '@/services';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const user = await AuthService.signup({ email, password });

    const verificationToken = await TokenService.generateVerification(
      user.email
    );

    await EmailService.sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return Response.json({
      status: true,
      message: 'Confirmation email sent!',
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

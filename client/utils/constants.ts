const nextAuthSecret = process.env.AUTH_SECRET;
const nextAppUrl = process.env.NEXT_PUBLIC_APP_URL;
const env = process.env.NODE_ENV;
const githubClientId = process.env.GITHUB_CLIENT_ID as string;
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET as string;

const googleClientId = process.env.GOOGLE_CLIENT_ID as string;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET as string;

const jwtSecret = process.env.JWT_SECRET;
const jwtSecretExpiresIn = process.env.JWT_SECRET_EXPIRES_IN;
const stripeApiKey = process.env.STRIPE_SECRET_KEY as string;
const stripeHookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const muxAccessToken = process.env.MUX_ACCESS_TOKEN_ID as string;
const muxSecretKey = process.env.MUX_SECRET_KEY as string;

const resendApiKey = process.env.RESEND_API_KEY as string;
const emailFrom = process.env.EMAIL_FROM as string;

const config = {
  nextAuthSecret,
  nextAppUrl,
  env,
  githubClientId,
  githubClientSecret,
  googleClientId,
  googleClientSecret,
  jwtSecret,
  jwtSecretExpiresIn,
  stripeApiKey,
  stripeHookSecret,
  muxAccessToken,
  muxSecretKey,
  resendApiKey,
  emailFrom
};

export default config;

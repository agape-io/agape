import 'dotenv/config';

export const env = {
  Facebook: {
    ClientId: process.env.FACEBOOK_CLIENT_ID,
    ClientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    CallbackUrl: process.env.FACEBOOK_CALLBACK_URL,
  },
  MongoDB: {
    ConnString: process.env.MONGO_DB_URL,
  },
  JSONWebToken: {
    Key: process.env.JWT_TOKEN_KEY,
  },
  ENDPOINT: process.env.ENDPOINT,
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  ADMIN: {
    Domain: process.env.ADMIN_DOMAIN,
    TokenKey: process.env.ADMIN_JWT_TOKEN_KEY,
  },
};

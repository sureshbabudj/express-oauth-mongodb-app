// app/config.ts
import dotenv from 'dotenv';

dotenv.config();

interface config {
  secret: string;
  databaseURI: string;
  google: OAuthConfig;
}

interface OAuthConfig {
  clientID: string;
  clientSecret: string;
  callbackURL: string;
};

const config: config = {
  google: {
    clientID: process.env.CLIENT_ID!,
    clientSecret: process.env.CLIENT_SECRET!,
    callbackURL: process.env.CALLBACK_URL!,
  },
  secret: process.env.SECRET_KEY!,
  databaseURI: process.env.DATABASE_URI!,
}

export default config;

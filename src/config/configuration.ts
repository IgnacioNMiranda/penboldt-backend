import * as crypto from 'crypto';
import { firebaseEncryptedCredential } from './google_credentials';

const decipher = crypto.createDecipheriv(
  'aes-128-cbc',
  process.env.GOOOGLE_APPLICATION_CREDENTIALS_ENCRYPTION_KEY,
  process.env.GOOOGLE_APPLICATION_CREDENTIALS_ENCRYPTION_IV,
);
let fireBaseCredentials = decipher.update(
  firebaseEncryptedCredential,
  'base64',
  'utf8',
);
fireBaseCredentials += decipher.final('utf8');

export default () => ({
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 4000,
  mongoUri: process.env.MONGODB_URI,
  fireBase: {
    credentials: JSON.parse(fireBaseCredentials),
  },
});

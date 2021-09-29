export default () => ({
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 4000,
  mongoUri: process.env.MONGODB_URI,
  encryption: {
    key: process.env.GOOGLE_APPLICATION_CREDENTIALS_ENCRYPTION_KEY,
    iv: process.env.GOOGLE_APPLICATION_CREDENTIALS_ENCRYPTION_IV,
    algorithm: process.env.ENCRYPTION_ALGORITHM,
  },
});

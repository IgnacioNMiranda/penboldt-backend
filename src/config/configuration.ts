export default () => ({
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 4000,
  mongoUri: process.env.MONGODB_URI,
  fireBase: {
    credentials: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS),
  },
});

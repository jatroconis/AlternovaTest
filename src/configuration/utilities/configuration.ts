export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    type: process.env.DATABASE_TYPE,
    port: parseInt(process.env.DATABASE_PORT, 10) || 3006,
    host: process.env.DATABASE_HOST,
    name: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  },
  security: {
    secretKey: process.env.SECRET_KEY,
    expirationTime: process.env.EXPIRATION_TIME,
  },
});

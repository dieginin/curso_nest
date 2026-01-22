export const AppConfig = () => ({
  environment: process.env.NODE_ENV || 'dev',
  mongoDb: process.env.MONGODB!,
  port: process.env.PORT,
  defaultLimit: Number(process.env.DEFAULT_LIMIT),
});

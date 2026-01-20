import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v2');

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((e) => console.error(e));

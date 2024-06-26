import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.use(cookieParser());
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: configService.get('CORS_ORIGIN'),
    credentials: true,
  });
  await app.listen(configService.get('HTTP_PORT'));
}
bootstrap();

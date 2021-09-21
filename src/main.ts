import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    abortOnError: false,
  });

  const config = app.get<ConfigService>(ConfigService);
  const env = config.get('env');

  const origin = ['https://penboldt-web.vercel.app/'];
  if (env === 'development') {
    origin.push('http://localhost:3000');
  }

  app.enableCors({
    origin,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  });
  app.use(helmet());

  await app.listen(config.get('port'));
}
bootstrap();

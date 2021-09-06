import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './domain/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [ConfigModule.forRoot({ load: [configuration] }), AuthModule],
  controllers: [AppController],
})
export class AppModule {}

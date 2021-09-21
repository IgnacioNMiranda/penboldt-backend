import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './domain/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserModule } from './domain/user/user.module';

@Module({
  imports: [
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('mongoUri'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
    ConfigModule.forRoot({ load: [configuration] }),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
})
export class AppModule {}

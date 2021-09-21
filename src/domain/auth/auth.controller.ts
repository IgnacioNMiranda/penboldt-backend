import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserCredentialsDTO } from '../user/dto/user-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() credentials: UserCredentialsDTO) {
    return this.authService.register(credentials);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() credentials: UserCredentialsDTO) {
    return this.authService.login(credentials);
  }
}

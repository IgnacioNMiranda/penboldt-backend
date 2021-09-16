import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { IsObjectIdPipe } from '../../pipes/isObjectId.pipe';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', new IsObjectIdPipe()) id: string) {
    return this.userService.findById(id);
  }
}

import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
} from '@nestjs/common';
import { IsObjectIdPipe } from '../../pipes/isObjectId.pipe';
import { UserService } from './user.service';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    this.logger.info('Retrieving every user...', {
      context: this.constructor.name,
    });
    return this.userService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', new IsObjectIdPipe()) id: string) {
    this.logger.info(`Retrieving user by id '${id}'...`, {
      context: this.constructor.name,
    });
    return this.userService.findById(id);
  }
}

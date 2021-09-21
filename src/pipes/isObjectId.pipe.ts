import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import * as mongoose from 'mongoose';

@Injectable()
export class IsObjectIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value || !metadata || !mongoose.Types.ObjectId.isValid(value)) {
      throw new BadRequestException('Invalid user id');
    }
    return value;
  }
}

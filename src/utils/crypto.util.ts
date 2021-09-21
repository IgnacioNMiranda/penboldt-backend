import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CryptoUtil {
  encrypt(data: string, salt = 10) {
    return bcrypt.hash(data, salt);
  }

  compare(raw: string, crypt: string) {
    return bcrypt.compare(raw, crypt);
  }
}

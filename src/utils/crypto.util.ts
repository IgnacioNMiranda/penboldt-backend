import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

@Injectable()
export class CryptoUtil {
  constructor(private readonly configService: ConfigService) {}

  encrypt(data: string, salt = 10) {
    return bcrypt.hash(data, salt);
  }

  compare(raw: string, crypt: string) {
    return bcrypt.compare(raw, crypt);
  }

  decipher(encryptedData: string) {
    const decipher = crypto.createDecipheriv(
      this.configService.get('encryption.algorithm'),
      this.configService.get('encryption.key'),
      this.configService.get('encryption.iv'),
    );
    let credentials = decipher.update(encryptedData, 'base64', 'utf8');
    credentials += decipher.final('utf8');
    return credentials;
  }
}

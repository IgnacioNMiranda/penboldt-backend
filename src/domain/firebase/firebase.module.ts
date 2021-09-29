import { Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { CryptoUtil } from '../../utils/crypto.util';

@Module({
  providers: [FirebaseService, CryptoUtil],
  exports: [FirebaseService],
})
export class FirebaseModule {}

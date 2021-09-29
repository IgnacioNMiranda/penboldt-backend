import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import admin from 'firebase-admin';
import { CryptoUtil } from '../../utils/crypto.util';
import { User } from '../user/entities/user.entity';
import { firebaseEncryptedCredential } from '../../config/firebase_credential';

@Injectable()
export class FirebaseService {
  constructor(private readonly cryptoUtil: CryptoUtil) {
    if (admin.apps.length === 0) {
      const credentials = this.cryptoUtil.decipher(firebaseEncryptedCredential);
      const certCredentials = JSON.parse(credentials);
      admin.initializeApp({
        credential: admin.credential.cert(certCredentials),
      });
    }
  }

  async findUser(email: string) {
    try {
      const foundUser = await admin.auth().getUserByEmail(email);
      return foundUser;
    } catch (error) {
      return undefined;
    }
  }

  async registerUser(email: string, password: string, userId: string) {
    const displayName = email.replace(/_\.-/, '').split('@')[0];

    try {
      const { uid } = await admin
        .auth()
        .createUser({ email, password, uid: userId, displayName });
      return uid;
    } catch (error) {
      if (error.errorInfo?.code === 'auth/email-already-exists') {
        throw new BadRequestException('Email is already in use');
      }
      throw new InternalServerErrorException(
        'Something went wrong. Try again later.',
      );
    }
  }

  async getToken(uid: string, user: User) {
    const { email } = user;
    const claims = {
      email,
    };

    try {
      const token = await admin.auth().createCustomToken(uid, claims);
      return token;
    } catch (error) {
      throw new InternalServerErrorException(
        'Something went wrong during sign in. Please try again.',
      );
    }
  }
}

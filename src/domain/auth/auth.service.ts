import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserCredentialsDTO } from '../user/dto/user-credentials.dto';
import { CryptoUtil } from '../../utils/crypto.util';
import { FirebaseService } from '../firebase/firebase.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly cryptoUtil: CryptoUtil,
    private readonly firebaseService: FirebaseService,
    private readonly userService: UserService,
  ) {}

  async register(credentials: UserCredentialsDTO) {
    const { email, password } = credentials;

    const user = await this.userService.findByEmail(email);
    if (user) {
      throw new BadRequestException(`'${email}' is already occupied`);
    }

    const firebaseUser = await this.firebaseService.findUser(email);
    if (firebaseUser) {
      if (firebaseUser.providerData) {
        throw new BadRequestException(
          `You already have an account linked to ${email}`,
        );
      }
      throw new InternalServerErrorException(
        'Something went wrong during the register, please contact an administrator.',
      );
    }

    const cryptPassword = await this.cryptoUtil.encrypt(password);
    const encryptUser = {
      email,
      password: cryptPassword,
    };

    try {
      const user = await this.userService.register(encryptUser);
      const uid = await this.firebaseService.registerUser(
        email,
        password,
        user.id,
      );

      const token = await this.firebaseService.getToken(uid, user);
      return { token };
    } catch (error) {
      console.log({ error });
    }
  }

  async login(credentials: UserCredentialsDTO) {
    const { email, password } = credentials;

    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new BadRequestException(
        `We have not found a registered account with '${email}'`,
      );
    }

    const firebaseUser = await this.firebaseService.findUser(email);
    if (!firebaseUser) {
      throw new InternalServerErrorException(
        'Something went wrong with your user credentials, please contact an administrator.',
      );
    }

    const cryptPassword = await this.cryptoUtil.encrypt(password);
    const isValidPassword = await this.cryptoUtil.compare(
      password,
      cryptPassword,
    );
    if (!isValidPassword) {
      throw new BadRequestException(`Wrong email or password`);
    }

    try {
      const token = await this.firebaseService.getToken(firebaseUser.uid, user);
      return { token };
    } catch (error) {
      console.log({ error });
    }
  }
}

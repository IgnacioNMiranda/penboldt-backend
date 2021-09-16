import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { UserCredentialsDTO } from './dto/user-credentials.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userRepository: ReturnModelType<typeof User>,
  ) {}

  async register(credentials: UserCredentialsDTO) {
    const newUser = new this.userRepository(credentials);
    await newUser.save();
    return newUser;
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find().exec();
  }

  findById(id: string): Promise<User> {
    return this.userRepository.findById(id).exec();
  }

  findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ email }).exec();
  }
}

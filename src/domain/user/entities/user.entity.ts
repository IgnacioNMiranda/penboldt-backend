import { prop } from '@typegoose/typegoose';

export class User {
  @prop({ type: String, required: true, unique: true })
  email: string;

  @prop({ type: String, required: true })
  password: string;
}

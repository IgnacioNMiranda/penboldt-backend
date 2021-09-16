import { IsString, IsEmail } from 'class-validator';

export class UserCredentialsDTO {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}

import { IsString, IsEmail } from 'class-validator';

export class ChangeUserInformationDto {
  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  password: string;
}

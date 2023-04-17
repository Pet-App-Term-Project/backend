import { IsString, IsNumber, IsUrl } from 'class-validator';

export class AddMatchUserDto {
  @IsString()
  petName: string;

  @IsString()
  petType: string;

  @IsString()
  petSpecie: string;

  @IsNumber()
  petAge: number;

  @IsUrl()
  petImage: string;
}

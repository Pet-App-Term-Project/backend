import { IsString, IsObject, IsArray } from 'class-validator';
export class CreateAdvertDto {
  @IsArray()
  photoUrl: Array<string>;

  @IsString()
  title: string;

  @IsObject()
  location: object;

  @IsString()
  description: string;

  @IsString()
  age: string;

  @IsString()
  breed: string;

  @IsString()
  species: string;
}

import { IsString, IsObject, IsArray, IsOptional } from 'class-validator';
export class CreateAdvertDto {
  @IsArray()
  photoURL: Array<string>;

  @IsString()
  title: string;

  @IsObject()
  location: object;

  @IsString()
  description: string;

  @IsString()
  age: string;

  @IsString()
  @IsOptional()
  breed: string;

  @IsString()
  species: string;
}

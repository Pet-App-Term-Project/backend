import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateForumPostDto {
  @IsString()
  @MaxLength(280)
  @MinLength(1)
  content: string;

  @IsString()
  @IsOptional()
  image: string;
}

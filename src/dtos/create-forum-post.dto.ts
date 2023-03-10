import {
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateForumPostDto {
  @IsString()
  @MaxLength(280)
  @MinLength(1)
  content: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  image?: string;
}

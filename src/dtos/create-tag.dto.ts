import { IsArray } from 'class-validator';

export class CreateTagDto {
  @IsArray()
  filters: Array<string>;
}

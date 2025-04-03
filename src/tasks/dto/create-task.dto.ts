import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  description: string;

  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  isCompleted: boolean;
}

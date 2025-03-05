import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CanBeUndefined } from '../../Utilities/can-be-undefined';
import { Transform } from 'class-transformer';

export class UpdateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  @CanBeUndefined()
  @IsNotEmpty()
  description: string;

  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  isCompleted: boolean;
}

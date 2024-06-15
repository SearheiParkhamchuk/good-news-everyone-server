import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { toNumber } from 'lodash';
import { UUID } from '@/src/05-shared/types/uuid';

class Category {
  @IsUUID('all', { message: 'Invalid category id' })
  uuid: UUID;
}

class FilterBy {
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Category)
  categories?: Category[];
}

class SortBy {
  by: string;
  direction: 'DESC' | 'ASC';
}

export class GetManyQueryParamsDto {
  @IsString()
  @IsOptional()
  query?: string;

  @Transform(({ value }: { value: string }): number => toNumber(value))
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  page: number = 0;

  @Transform(({ value }: { value: string }): number => toNumber(value))
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  @Min(1)
  @Max(50)
  size: number;

  @IsNotEmpty()
  orderBy: SortBy;

  @IsOptional()
  @ValidateNested()
  @Type(() => FilterBy)
  filter_by?: FilterBy;
}

import { Type } from 'class-transformer'
import {
  Equals,
  IsISO8601,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator'
import { APIResponse } from './response'

// prettier-ignore
export class Category {
  @IsNumber() id: number
  @IsString() keyword: string
  @IsString() slug: string
  @IsString() @IsOptional() icon?: string
  @Type(() => Boolean) is_active: boolean

  @IsISO8601() @IsOptional() created_at?: string
  @IsISO8601() @IsOptional() updated_at?: string
}

export module CategoryResponse {
  export class Get extends APIResponse.OK {
    @ValidateNested()
    @Type(() => Category)
    declare data: Category[]
  }
}

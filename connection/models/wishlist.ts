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
import { Course } from '@Models/course'

// prettier-ignore
export class Wish {
  @IsNumber() id: number
  @IsNumber() @IsOptional() user_id: number
  @IsNumber() course_id: number
  
  @Type(() => Course)
  @ValidateNested()
  @IsOptional()
  course?: Course

  @IsISO8601() @IsOptional() created_at?: string
  @IsISO8601() @IsOptional() updated_at?: string
}

export module WishResponse {
  export class Get extends APIResponse.OK {
    @ValidateNested()
    @Type(() => Wish)
    declare data: Wish[]
  }

  export class Add extends APIResponse.Created {
    @ValidateNested()
    @Type(() => Wish)
    data: Wish
  }

  export class Remove extends APIResponse.Deleted {}
}

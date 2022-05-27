import { Type } from 'class-transformer'
import {
  Equals,
  IsISO8601,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator'
import { Course } from './course'
import { APIResponse } from './response'

// prettier-ignore
export class Cart {
  @IsNumber() id: number
  @IsNumber() session_id: number
  @IsNumber() course_id: number

  @IsNumber() quantity: number
  discount: any

  @IsISO8601() @IsOptional() created_at?: string
  @IsISO8601() @IsOptional() updated_at?: string

  @Type(() => Course)
  @ValidateNested()
  course: Course
}

export module CartResponse {
  export class Get extends APIResponse.OK {
    @ValidateNested()
    @Type(() => Cart)
    declare data: Cart[]
  }

  export class Add extends APIResponse.Created {}

  export class Remove extends APIResponse.Deleted {}
}

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
export class Wish {
  @IsNumber() id: number
  @IsNumber() user_id: number
  @IsNumber() course_id: number

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

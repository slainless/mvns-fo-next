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
export class Blog {
  @IsNumber() id: number
  @IsString() title: string
  @IsString() subtitle: string
  @IsString() thumbnail: string
  @IsString() thumbnail_url: string

  @IsString() slug: string
  @IsString() content: string
  @IsString() status: string

  @IsNumber() user_id: number

  @IsISO8601() @IsOptional() created_at?: string
  @IsISO8601() @IsOptional() updated_at?: string

  category: any
}

export module BlogResponse {
  export class Get extends APIResponse.OK {
    @ValidateNested()
    @Type(() => Blog)
    declare data: Blog[]
  }

  export class GetOne extends APIResponse.OK {
    @ValidateNested()
    @Type(() => Blog)
    declare data: Blog
  }
}

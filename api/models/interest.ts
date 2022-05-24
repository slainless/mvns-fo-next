import { Type } from 'class-transformer'
import { IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator'
import { Category, CategoryResponse } from './category'
import { APIResponse } from './response'

export class Interest {
  @IsNumber() id: number
  @IsNumber() user_id: number
  @IsNumber() keyword_id: number

  @IsString() @IsOptional() created_at?: string
  @IsString() @IsOptional() updated_at?: string

  @Type(() => Category)
  @ValidateNested()
  @IsOptional()
  keyword: Category[]
}

export module InterestResponse {
  export class Get extends CategoryResponse.Get {}

  export class Add extends APIResponse.Created {
    @Type(() => Interest)
    @ValidateNested()
    data: Interest[]
  }
}

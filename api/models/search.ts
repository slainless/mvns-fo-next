import { Type } from 'class-transformer'
import {
  IsBoolean,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator'
import { capitalize } from 'lodash-es'
import { APIResponse } from './response'
import { User } from './user'
import { Course } from './course'
import { Blog } from './blog'

// prettier-ignore
export class SearchResult {
  @Type(() => Course) @ValidateNested() courses: Course[]
  @Type(() => Blog) @ValidateNested() blogs: Blog[]
  @Type(() => User) @ValidateNested() instructor: User[]
}

export module SearchResponse {
  export class Get extends APIResponse.OK {
    @ValidateNested()
    @Type(() => SearchResult)
    declare data: SearchResult
  }
}

import { Type } from 'class-transformer'
import {
  IsBoolean,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator'
import { capitalize, lowerCase } from 'lodash-es'
import { APIResponse } from './response'
import { User } from './user'

export enum CourseType {
  VIDEO = 'video',
  ONLINE = 'online',
  // PHYSICAL = 'physical',
  OFFLINE = 'offline',
}

export enum CourseQuery {
  MOST_POPULAR = 'most_popular',
  NEWEST = 'newest',
  TRENDING = 'trending',
  HIGHEST_RATED = 'highest_rated',
}

export class Enrollment {
  @IsNumber() id: number
  @IsNumber() user_id: number
  @IsNumber() course_id: number
  @IsString() @IsOptional() enroll_code: string

  @IsString() @IsOptional() created_at?: string
  @IsString() @IsOptional() updated_at?: string
  @IsString() @IsOptional() complete_at?: string

  @IsString() @IsOptional() review?: string
}

export class Price {
  @IsNumber() id: number
  @IsNumber() course_id: number

  @IsString() @IsOptional() title: string
  @IsNumber() @IsOptional() price: number
  @IsString() @IsOptional() description: string

  @IsString() @IsOptional() created_at?: string
  @IsString() @IsOptional() updated_at?: string
}

export class Lesson {
  @IsNumber() id: number
  @IsNumber() course_id: number

  @IsString() @IsOptional() title: string
  @IsString() @IsOptional() description: string
  @Type(() => Boolean) is_active: boolean

  @IsString() @IsOptional() created_at?: string
  @IsString() @IsOptional() updated_at?: string

  @IsString() @IsOptional() content: string
  @IsString() @IsOptional() pdf_path: string
}

export class Review {}

// prettier-ignore
export class Course {
  @IsNumber() id: number
  @IsString() @IsOptional() title: string
  @IsString() @IsOptional() description: string
  @IsString() @IsOptional() subtitle: string
  @IsString() @IsOptional() image: string
  @IsString() @IsOptional() trailer: string

  @IsIn(
    [
      ...Object.values(CourseType).map(capitalize),
      ...Object.values(CourseType).map(lowerCase),
    ]) 
  @IsOptional() 
  type: CourseType

  @IsString() @IsOptional() slug?: string
  @IsString() @IsOptional() link?: string
  @IsString() @IsOptional() zoom_link?: string

  @Type(() => Boolean) is_featured: boolean
  @Type(() => Boolean) is_active: boolean
  @Type(() => Boolean) is_enable_coming_soon: boolean
  @Type(() => Boolean) is_comingsoon: boolean
  @Type(() => Boolean) @IsOptional() is_wishlist?: boolean

  @IsString() @IsOptional() course_datetime?: string
  @IsString() @IsOptional() difficulty?: string
  @IsString() @IsOptional() max_students?: string
  @IsString() @IsOptional() min_students?: string
  @IsString() @IsOptional() language?: string
  @IsString() @IsOptional() category?: string
  @IsString() @IsOptional() second_category?: string
  @IsString() @IsOptional() target_audience?: string
  @IsNumber() @IsOptional() avg_rating?: number
  @IsNumber() @IsOptional() total_rating?: number

  @IsNumber() @IsOptional() instructor_id?: number
  @IsNumber() @IsOptional() co_instructor_id?: number
  // @IsNumber() @IsOptional() number_of_session?: number
  @IsOptional() number_of_session?: any
  // duration_for_each_session: server will return Array<string> in String... WTF
  @IsString() @IsOptional() duration_for_each_session?: string

  @IsString() @IsOptional() requirements?: string

  @IsString() @IsOptional() feature_image?: string

  @IsString() @IsOptional() coming_soon_end_time?: string
  @IsString() @IsOptional() comingsoon_endtime?: string

  @IsString() @IsOptional() created_at?: string
  @IsString() @IsOptional() updated_at?: string

  @Type(() => Enrollment) 
  @ValidateNested() 
  enrollment: Enrollment[]

  @Type(() => Price) 
  @ValidateNested() 
  prices: Price[]

  @Type(() => User)
  @ValidateNested()
  instructor_user: User

  @Type(() => Lesson)
  @ValidateNested()
  lessons: Lesson[]

  @Type(() => Review)
  @ValidateNested()
  reviews: Review[]
}

export module CourseResponse {
  export class Get extends APIResponse.OK {
    @ValidateNested()
    @Type(() => Course)
    declare data: Course[]
  }

  export class GetOne extends APIResponse.OK {
    @ValidateNested()
    @Type(() => Course)
    declare data: Course
  }
}

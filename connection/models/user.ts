import { Type } from 'class-transformer'
import {
  IsArray,
  IsIn,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator'
import { Interest } from './interest'
import { APIResponse } from './response'

export enum RoleValue {
  STUDENT = 'student',
  INSTRUCTOR = 'instructor',
  ADMIN = 'admin',
}

export class Role {
  @IsNumber() id: number
  @IsIn(Object.values(RoleValue)) name: RoleValue
}

// prettier-ignore
export class User {
  // must-have fields
  @IsNumber() id: number
  @IsString() firstname: string
  @IsString() email: string
  @IsString() @IsOptional() lastname: string
  @Type(() => Role)
  @ValidateNested()
  roles: Role[]

  // other
  @IsArray() @IsOptional() student_interest: any[]

  // optional fields
  @IsString() @IsOptional() email_verified_at?: string
  @IsString() @IsOptional() nickname?: string
  @IsString() @IsOptional() birthdate?: string
  @IsString() @IsOptional() country?: string
  @IsString() @IsOptional() phone?: string
  @IsString() @IsOptional() link_twitter?: string
  @IsString() @IsOptional() link_facebook?: string
  @IsString() @IsOptional() link_youtube?: string
  @IsString() @IsOptional() image?: string
  @IsString() @IsOptional() provider?: string
  @IsString() @IsOptional() id_provider?: string
  @IsString() @IsOptional() created_at?: string
  @IsString() @IsOptional() updated_at?: string
}

export class AuthUser extends User {
  // credential
  @IsString() token: string
  @IsArray() declare student_interest: Interest[]
}

export module AuthUserResponse {
  export class Register extends APIResponse.Created {
    @ValidateNested()
    @Type(() => AuthUser)
    data: AuthUser
  }

  export class Login extends APIResponse.OK {
    @ValidateNested()
    @IsOptional()
    @Type(() => AuthUser)
    declare data: AuthUser
  }
}

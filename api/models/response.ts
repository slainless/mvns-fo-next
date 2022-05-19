import '@abraham/reflection'
import {
  Equals,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export module APIResponse {
  // prettier-ignore
  export class Generic {
    @IsOptional() @IsNumber() code?: number
    @IsString() message: string
  }

  // prettier-ignore
  export class Created extends Generic {
    @Equals(201) declare code: 201
  }

  // prettier-ignore
  export class OK extends Generic {
    @Equals(200) declare code: 200
    @IsBoolean() success: boolean
    @IsOptional() data?: any
  }

  // prettier-ignore
  export class Deleted extends Generic {
    @Equals(200) declare code: 200
    @IsBoolean() success: boolean
    @IsOptional() data?: any
  }

  // prettier-ignore
  export class Unauthorized extends Generic {
    @Equals(401) declare code: 401
    @Equals(false) success: false
    @IsOptional() data?: any
  }

  // prettier-ignore
  export class NotFound extends Generic {
    @Equals(404) declare code: 404
    @Equals(false) success: false
  }

  // prettier-ignore
  export class InternalError extends Generic {
    @IsOptional() @Equals(500) declare code?: 500
    @IsOptional() @IsString() exception?: string
  }
}

export default APIResponse

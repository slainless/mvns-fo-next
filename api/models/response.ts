import '@abraham/reflection'
import { plainToInstance } from 'class-transformer'
import {
  Equals,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export module APIError {
  export class Generic extends Error {
    code?: number
  }

  export class Unauthorized extends Generic {
    declare code: 401
    success: false
    data?: any
  }

  // prettier-ignore
  export class NotFound extends Generic {
    declare code: 404
    success: false
  }

  export class Conflict extends Generic {
    declare code: 409
    success: false
  }

  // prettier-ignore
  export class InternalError extends Generic {
    declare code?: 500
    exception?: string
  }
}

export module APIResponse {
  // prettier-ignore
  export class Generic {
    @IsOptional() @IsNumber() code?: number
    @IsString() message: string
    toError() {
      return plainToInstance(APIError.Generic, this)
    }
  }

  // prettier-ignore
  export class Created extends Generic {
    @Equals(201) declare code: 201
    declare message: never
    declare toError: never
  }

  // prettier-ignore
  export class OK extends Generic {
    @Equals(200) declare code: 200
    @IsBoolean() success: boolean
    @IsOptional() data?: any
    declare message: never
    declare toError: never
  }

  // prettier-ignore
  export class Deleted extends OK {}

  // prettier-ignore
  export class Unauthorized extends Generic {
    @Equals(401) declare code: 401
    @Equals(false) success: false
    @IsOptional() data?: any
    toError() {
      return plainToInstance(APIError.Unauthorized, this)
    }
  }

  // prettier-ignore
  export class NotFound extends Generic {
    @Equals(404) declare code: 404
    @Equals(false) success: false
    toError() {
      return plainToInstance(APIError.NotFound, this)
    }
  }

  export class Conflict extends Generic {
    @Equals(409) declare code: 409
    @Equals(false) success: false
    toError() {
      return plainToInstance(APIError.Conflict, this)
    }
  }

  // prettier-ignore
  export class InternalError extends Generic {
    @IsOptional() @Equals(500) declare code?: 500
    @IsOptional() @IsString() exception?: string
    toError() {
      return plainToInstance(APIError.InternalError, this)
    }
  }
}

export default APIResponse

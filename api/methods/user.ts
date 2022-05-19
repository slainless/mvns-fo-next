import create from 'zustand'
import { persist } from 'zustand/middleware'
import { AuthUserResponse, AuthUser } from '@Models/user'
import join from 'url-join'
import { isEmpty } from 'lodash-es'
import { requestJSON } from '@Functions/request'
import Endpoints from './endpoint'

export module UserAPI {
  export function login(input: { email: string; password: string }) {
    const { email, password } = input

    if (isEmpty(email) || isEmpty(password)) {
      throw new Error('Email or password should not be empty!')
    }

    return requestJSON(Endpoints.LOGIN, {
      method: 'post',
      json: input,
      headers: {
        Accept: 'application/json',
      },
      responseType: {
        200: AuthUserResponse.Login,
      },
    })
  }

  export function register(input: {
    firstname: string
    lastname: string
    email: string
    password: string
  }) {
    const { firstname, lastname, email, password } = input

    if (
      isEmpty(email) ||
      isEmpty(password) ||
      isEmpty(firstname) ||
      isEmpty(lastname)
    ) {
      throw new Error(`There can't be an empty input!`)
    }

    return requestJSON(Endpoints.STUDENT_REGISTER, {
      method: 'post',
      json: input,
      headers: {
        Accept: 'application/json',
      },
      responseType: {
        201: AuthUserResponse.Register,
      },
    })
  }
}

export default UserAPI

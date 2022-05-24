import { Button } from '@Components/Button'
import { ControlGroup } from '@Components/ControlGroup'
import { Fieldset } from '@Components/Fieldset'
import { Flex } from '@Components/Flex'
import { Text } from '@Components/Text'
import { Link } from '@Components/Link'
import { TextField } from '@Components/TextField'
import { UserAPI } from '@Methods/user'
import { APIResponse } from '@Models/response'
import { Label } from '@Components/Label'
import { useRequest } from 'ahooks'
import { useState, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { FiAtSign, FiEye, FiEyeOff } from 'react-icons/fi'
import Loader from 'react-loaders'
import { Grid } from '@Components/Grid'
import { AuthUserResponse } from '@Models/user'
import { useAlertStore } from './Alert'
import { useAlertDialogState } from './AlertDialog'
import useRequestHandler from './use-request-handler'

type RegisterInput = {
  email: string
  first_name: string
  last_name: string
  password: string
  confirm_password: string
}
export default function RegisterForm() {
  const setAlert = useAlertStore((state) => state.set)
  const [hidePass, setHidePass] = useState(true)

  const {
    data: registerResult,
    error,
    loading,
    run: registerUser,
  } = useRequest(UserAPI.register, {
    manual: true,
  })
  useRequestHandler(registerResult, error)

  const { register, handleSubmit, formState } = useForm<RegisterInput>()
  const onSubmit: SubmitHandler<RegisterInput> = (data) => {
    setAlert(null)
    registerUser({
      email: data.email,
      firstname: data.first_name,
      lastname: data.last_name,
      password: data.password,
    })
  }

  return (
    <form
      style={{
        display: 'contents',
      }}
      onSubmit={handleSubmit(onSubmit)}
      id="login-form"
    >
      <Grid
        columns={2}
        css={{
          gap: '$2',
        }}
      >
        <Fieldset>
          <Label htmlFor="first-name">First Name</Label>
          <TextField size="2" id="first-name" {...register('first_name')} />
        </Fieldset>

        <Fieldset>
          <Label htmlFor="last-name">Last Name</Label>
          <TextField size="2" id="last-name" {...register('last_name')} />
        </Fieldset>
      </Grid>

      <Fieldset>
        <Label htmlFor="email">Email Address</Label>
        <ControlGroup>
          <Button size="2" disabled type="button">
            <FiAtSign />
          </Button>
          <TextField
            size="2"
            id="email"
            placeholder="example@mail.com"
            {...register('email')}
          />
        </ControlGroup>
      </Fieldset>
      <Fieldset>
        <Label htmlFor="password">Password</Label>
        <ControlGroup>
          <TextField
            size="2"
            id="password"
            type={hidePass ? 'password' : 'text'}
            {...register('password')}
          />
          <Button
            type="button"
            size="2"
            tabIndex={-1}
            onClick={() => {
              setHidePass((o) => !o)
            }}
          >
            {hidePass ? <FiEye /> : <FiEyeOff />}
          </Button>
        </ControlGroup>
      </Fieldset>
      <Fieldset>
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <TextField
          size="2"
          id="confirm-password"
          type="password"
          {...register('confirm_password')}
        />
      </Fieldset>
      <Flex
        direction="column"
        css={{
          ai: 'center',
        }}
      >
        <Button
          size="3"
          css={{
            width: '100%',
            mx: 'auto',
            mt: '$2',
          }}
          variant="green"
          type="submit"
        >
          {loading ? <Loader type="ball-pulse" active /> : 'Sign Up'}
        </Button>
        <Text
          size="1"
          css={{
            textAlign: 'center',
            mt: '$2',
          }}
        >
          Already have an account? <Link variant="blue">Sign in</Link>
        </Text>
      </Flex>
    </form>
  )
}

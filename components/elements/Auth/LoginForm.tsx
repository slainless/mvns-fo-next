import { useState, useEffect } from 'react'
import { Fieldset } from '@Components/Fieldset'
import { Label } from '@Components/Label'
import { ControlGroup } from '@Components/ControlGroup'
import { Button } from '@Components/Button'
import { TextField } from '@Components/TextField'
import { Flex } from '@Components/Flex'
import { Text } from '@Components/Text'
import { Link } from '@Components/Link'
import { FiAtSign, FiEye, FiEyeOff } from 'react-icons/fi'
import Loader from 'react-loaders'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRequest } from 'ahooks'
import { UserAPI } from '@Methods/user'
import { useAlertStore } from './Alert'
import useRequestHandler from './use-request-handler'

type LoginInput = {
  email: string
  password: string
}
export default function LoginForm() {
  const setAlert = useAlertStore((state) => state.set)
  const [hidePass, setHidePass] = useState(true)

  const {
    data: loginResult,
    error,
    loading,
    run: login,
  } = useRequest(UserAPI.login, {
    manual: true,
  })
  useRequestHandler(loginResult, error)

  const { register, handleSubmit, formState } = useForm<LoginInput>()
  const onSubmit: SubmitHandler<LoginInput> = (data) => {
    setAlert(null)
    login(data)
  }

  return (
    <form
      style={{
        display: 'contents',
      }}
      onSubmit={handleSubmit(onSubmit)}
      id="login-form"
    >
      <Fieldset>
        <Label htmlFor="email">Email Address</Label>
        <ControlGroup>
          <Button type="button" size="2" disabled>
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
        <Flex
          css={{
            jc: 'space-between',
          }}
        >
          <Label htmlFor="password">Password</Label>
          <Link
            css={{
              fontSize: '$3',
            }}
            variant="blue"
          >
            Forgot Password
          </Link>
        </Flex>
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
            mb: '$2',
            mt: '$2',
          }}
          variant="green"
          type="submit"
          form="login-form"
        >
          {loading ? <Loader type="ball-pulse" active /> : 'Sign In'}
          {/* <Loader type="ball-pulse" /> */}
        </Button>
        <Text
          size="1"
          css={{
            textAlign: 'center',
          }}
        >
          Don&apos;t have an account? <Link variant="blue">Sign up</Link>
        </Text>
      </Flex>
    </form>
  )
}

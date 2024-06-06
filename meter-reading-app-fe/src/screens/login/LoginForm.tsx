import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ZodError, z } from 'zod'

import Input from '@Components/ui/Input'
import Button from '@Components/ui/Button'
import FormWrapper from '@Components/wrappers/FormWrapper'

import { setUser } from '@State/slices/user'
import { useLoginMutation } from '@State/apis/auth'

import { ROOT_PATHS } from '@Types/routes'

const credentialsSchema = z.object({
  username: z.string().min(1, 'Please enter your username'),
  password: z.string().min(1, 'Please enter your password'),
})

type TLoginFormErrors = {
  username?: string
  password?: string
}

const LoginForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [formErrors, setFormErrors] = useState<TLoginFormErrors>({})
  const [logInUser, { data: user }] = useLoginMutation()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const credentials = {
      username: 'joebloggs',
      password: 'test123!',
    }

    // const credentials = {
    //   username,
    //   password,
    // }

    const validatedFormData = credentialsSchema.safeParse(credentials)

    if (validatedFormData.success) {
      setFormErrors({})
      try {
        await logInUser(validatedFormData.data).unwrap()
      } catch (error) {
        // @TODO handle error
        console.error('Failed to login:', error)
      }
    } else {
      const zodError = validatedFormData.error as ZodError
      const updatedErrors: TLoginFormErrors = {}

      zodError.errors.forEach((error) => {
        if (error.path.includes('username')) {
          updatedErrors.username = error.message
        }

        if (error.path.includes('password')) {
          updatedErrors.password = error.message
        }
      })

      setFormErrors(updatedErrors)
    }
  }

  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  useEffect(() => {
    if (user) {
      dispatch(setUser(user))
      navigate(ROOT_PATHS.METER_READINGS)
    }
  }, [user, dispatch, navigate])

  return (
    <FormWrapper submitHandler={handleSubmit} heading="Let's go!">
      <Input
        label="Username"
        value={username}
        onChange={handleChangeUsername}
        error={formErrors.username}
      />

      <Input
        type="password"
        label="Password"
        value={password}
        onChange={handleChangePassword}
        error={formErrors.password}
      />

      <Button type="submit" label="Log in" />
    </FormWrapper>
  )
}
export default LoginForm

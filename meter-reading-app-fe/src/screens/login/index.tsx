import { Navigate } from 'react-router-dom'

import LoginForm from './LoginForm'

import useUser from '@State/selectors/useUser'

import { ROOT_PATHS } from '@Types/routes'

const Login: React.FC = () => {
  const user = useUser()

  return user ? <Navigate to={ROOT_PATHS.METER_READINGS} /> : <LoginForm />
}

export default Login

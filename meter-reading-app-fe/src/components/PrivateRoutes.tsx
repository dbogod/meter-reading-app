import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { isUserAuthenticated } from '@State/slices/user'

import { ROOT_PATHS } from '@Types/routes'

const PrivateRoutes: React.FC = () => {
  const isAuthenticated = useSelector(isUserAuthenticated)

  return isAuthenticated ? <Outlet /> : <Navigate to={ROOT_PATHS.LOGIN} />
}

export default PrivateRoutes

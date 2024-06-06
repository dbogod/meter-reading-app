import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import NavBarItem from './NavBarItem'
import ContentWrapper from '@Components/wrappers/ContentWrapper'
import Button from '@Components/ui/Button'

import { isUserAuthenticated, setUser } from '@State/slices/user'

import { ROOT_PATHS } from '@Types/routes'


const NavBar: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(isUserAuthenticated)

  const clickHandler = () => {
    dispatch(setUser(null))
    navigate(ROOT_PATHS.LOGIN)
  }

  return (
    <ContentWrapper>
      <nav className="py-4 min-h-nav-height">
        <ul className="flex justify-end gap-4">
          <NavBarItem to={ROOT_PATHS.HOME} label="Home" />
          {isAuthenticated ? (
            <>
              <NavBarItem
                to={ROOT_PATHS.METER_READINGS}
                label="My meter readings"
              />
              <NavBarItem
                to={ROOT_PATHS.ADD_METER_READING}
                label="New meter reading"
              />
              <li>
                <Button
                  onClick={clickHandler}
                  classNames="lg:ml-4 text-sm lg:text-lg"
                  label="Log out"
                  level='secondary'
                />
              </li>
            </>
          ) : (
            <NavBarItem to={ROOT_PATHS.LOGIN} label="Log in" />
          )}
        </ul>
      </nav>
    </ContentWrapper>
  )
}

export default NavBar

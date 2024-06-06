import { NavLink, NavLinkProps } from 'react-router-dom'

import { TPath } from '@Types/routes'

interface TNavBarItem extends NavLinkProps {
  to: TPath
  label: string
}

const NavBarItem: React.FC<TNavBarItem> = ({ label, ...rest }) => {
  return (
    <li className="text-center">
      <NavLink className="px-2 flex items-center h-full text-sm lg:text-lg" {...rest}>
        <span>{label}</span>
      </NavLink>
    </li>
  )
}

export default NavBarItem

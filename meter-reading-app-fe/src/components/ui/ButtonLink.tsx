import { Link, LinkProps } from 'react-router-dom'

import { TCommonButtonProps } from './Button'

interface TButtonProps extends LinkProps, TCommonButtonProps {}

const ButtonLink: React.FC<TButtonProps> = ({
  label,
  level = 'primary',
  classNames,
  ...rest
}) => {
  return (
    <Link className={`button button--${level} ${classNames ?? ''}`} {...rest}>
      {label}
    </Link>
  )
}

export default ButtonLink

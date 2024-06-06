export interface TCommonButtonProps {
  label: string
  classNames?: string
  level?: 'primary' | 'secondary'
}

interface TButtonProps
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    TCommonButtonProps {}

const Button: React.FC<TButtonProps> = ({
  label,
  level = 'primary',
  classNames,
  ...rest
}) => {
  return (
    <button className={`button button--${level} ${classNames ?? ''}`} {...rest}>
      {label}
    </button>
  )
}

export default Button

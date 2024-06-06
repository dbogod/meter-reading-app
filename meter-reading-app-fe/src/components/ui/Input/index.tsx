import { useId } from 'react'

interface TInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string
  label: string
  value: string
  error?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<TInputProps> = ({
  label,
  type = 'text',
  value,
  onChange,
  error,
  ...rest
}) => {
  const id = useId()

  return (
    <div className='flex flex-col gap-2 w-full max-w-96'>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        className={`border-2 px-4 py-2 ${error ? 'border-red-500' : ''}`}
        type={type}
        value={value}
        onChange={onChange}
        {...rest}
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}
export default Input

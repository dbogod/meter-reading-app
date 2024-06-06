import { FormEvent } from 'react'

import ContentWrapper from './ContentWrapper'

type TFormWrapperProps = {
  submitHandler:
    | ((e: React.FormEvent<HTMLFormElement>) => Promise<void>)
    | ((e: FormEvent) => void)
  children: React.ReactNode
  heading?: string
}

const FormWrapper: React.FC<TFormWrapperProps> = ({
  submitHandler,
  children,
  heading,
}) => {
  return (
    <ContentWrapper classNames="h-full">
      <div className="flex flex-col items-center h-full pt-44">
        {heading && <h1>{heading}</h1>}
        <form
          onSubmit={submitHandler}
          className="w-full mt-6 flex flex-col items-center gap-8"
        >
          {children}
        </form>
      </div>
    </ContentWrapper>
  )
}
export default FormWrapper

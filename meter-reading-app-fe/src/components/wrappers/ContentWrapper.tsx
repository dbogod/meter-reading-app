type TContentWrapperProps = {
  classNames?: string
  children: React.ReactNode
}

const ContentWrapper: React.FC<TContentWrapperProps> = ({ classNames, children }) => {
  return (
    <div className={`w-full max-w-screen-xl px-4 mx-auto ${classNames ?? ''}`}>
      {children}
    </div>
  )
}

export default ContentWrapper

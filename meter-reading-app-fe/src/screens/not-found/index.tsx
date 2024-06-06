import ContentWrapper from '@Components/wrappers/ContentWrapper'

const NotFound: React.FC = () => {
  return (
    <ContentWrapper classNames="pt-10">
      <div className="text-center max-w-prose flex flex-col gap-4 mx-auto">
        <h1 className="text-4xl">Ooops!</h1>
        <p>The page you are looking for does not exist.</p>
        <p>
          Please check the URL and try again, or click one of the links in the
          navigation bar at the top of the page.
        </p>
      </div>
    </ContentWrapper>
  )
}

export default NotFound

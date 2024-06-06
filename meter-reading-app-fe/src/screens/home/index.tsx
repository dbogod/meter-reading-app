import React from 'react'

import ContentWrapper from '@Components/wrappers/ContentWrapper'
import ButtonLink from '@Components/ui/ButtonLink'

import useUser from '@State/selectors/useUser'

import { ROOT_PATHS } from '@Types/routes'

const Home: React.FC = () => {
  const user = useUser()

  return (
    <ContentWrapper classNames="h-full">
      <div className="h-full flex flex-col justify-center">
        <div className="max-w-xl">
          <h1 className="lg:text-9xl">
            {user?.firstName ? `Hi, ${user.firstName}!` : 'Welcome!'}
          </h1>
          <p className="mt-4">
            {user
              ? 'Great to see you. You can now view your meter readings and add new readings.'
              : 'This is a simple meter reading app. You can add your meter readings and view your previous readings.'}
          </p>
          {user ? (
            <div className="flex gap-4">
              <ButtonLink
                to={ROOT_PATHS.METER_READINGS}
                classNames="mt-6 self-start"
                label="View meter readings"
              />
              <ButtonLink
                to={ROOT_PATHS.ADD_METER_READING}
                classNames="mt-6 self-start"
                label="Add new meter reading"
                level="secondary"
              />
            </div>
          ) : (
            <ButtonLink
              data-testid="login-button"
              to={ROOT_PATHS.LOGIN}
              classNames="mt-6 self-start"
              label="Log in"
            />
          )}
        </div>
      </div>
    </ContentWrapper>
  )
}

export default Home

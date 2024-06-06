import MeterReadingsTable from './MeterReadingsTable'
import ContentWrapper from '@Components/wrappers/ContentWrapper'
import ButtonLink from '@Components/ui/ButtonLink'

import { useGetMeterReadingsQuery } from '@State/apis/meterReadings'
import useUser from '@State/selectors/useUser'

import { ROOT_PATHS } from '@Types/routes'

const MeterReadings = () => {
  const user = useUser()
  const { data: meterReadings, isFetching } = useGetMeterReadingsQuery(user?.id)

  return (
    <ContentWrapper classNames="pt-10">
      <h1 className="text-4xl">My meter readings</h1>
      <br />
      <ButtonLink to={ROOT_PATHS.ADD_METER_READING} label="Add a new reading" />
      <div className="mt-6">
        {isFetching ? (
          <p>Loading...</p>
        ) : meterReadings?.length ? (
          <MeterReadingsTable meterReadings={meterReadings} />
        ) : (
          <p>'You have not added any meter readings yet'</p>
        )}
      </div>
    </ContentWrapper>
  )
}

export default MeterReadings

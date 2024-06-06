import { TMeterReading } from '@Types/meterReadings'

type TMeterReadingTableProps = {
  meterReadings: TMeterReading[]
}

const MeterReadingsTable: React.FC<TMeterReadingTableProps> = ({
  meterReadings,
}) => {
  const headerCellClasses =
    'border-b font-medium md:text-base p-2 md:p-4 text-left capitalize'
  return (
    <table className="border-collapse table-auto w-full text-sm">
      <thead>
        <tr className="">
          <th className={headerCellClasses} scope="col">
            Date
          </th>
          <th className={headerCellClasses} scope="col">
            Meter Type
          </th>
          <th className={headerCellClasses} scope="col">
            Reading
          </th>
        </tr>
      </thead>
      <tbody>
        {[...meterReadings].reverse().map((reading) => {
          const cellClasses = 'border-b p-2 md:p-4 md:text-base text-left capitalize'
          return (
            <tr key={reading.id}>
              <th className={cellClasses}>
                {reading.meterReadingDate.toString()}
              </th>
              <td className={cellClasses}>{reading.meterReadingType}</td>
              <td className={cellClasses}>{reading.readingValue}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
export default MeterReadingsTable

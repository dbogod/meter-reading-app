export enum TMeterType {
  Gas = 'gas',
  Electricity = 'electricity',
}

export interface TMeterReading {
  id: number
  accountId: number
  meterReadingDate: Date
  meterReadingType: TMeterType
  readingValue: string
  createdDateTime: Date
}

export interface TMeterReadingPayload {
  accountId: string
  meterReadingType: TMeterType
  readingValue: string
}

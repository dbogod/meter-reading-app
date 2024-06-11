export enum TMeterType {
  Gas = 'gas',
  Electricity = 'electricity',
}

export interface TMeterReading {
  id: string
  accountId: string
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

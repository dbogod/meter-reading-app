import { useEffect, useState } from 'react'
import Select from 'react-select'
import { ZodError, z } from 'zod'


import Input from '@Components/ui/Input'
import FormWrapper from '@Components/wrappers/FormWrapper'
import ButtonLink from '@Components/ui/ButtonLink'
import Button from '@Components/ui/Button'

import { useAddMeterReadingMutation } from '@State/apis'
import useUser from '@State/selectors/useUser'

import { TMeterType } from '@Types/meterReadings'
import { ROOT_PATHS } from '@Types/routes'

type TMeterOption = {
  value: TMeterType
  label: string
}

const meterReadingSchema = z.object({
  meterReadingType: z.nativeEnum(TMeterType, {
    errorMap: (issue, ctx) => {
      if (issue.code === 'invalid_enum_value') {
        return { message: 'Please select a valid meter type' }
      }

      return { message: ctx.defaultError }
    },
  }),
  readingValue: z
    .string()
    .length(5, 'Meter reading must be 5 digits long')
    .regex(/^\d{5}$/, 'Meter reading must be a number 5 digits long'),
})

type TAddMeterReadingFormErrors = {
  meterReadingType?: string
  readingValue?: string
}

const METER_TYPES: TMeterOption[] = [
  { value: TMeterType.Gas, label: 'Gas' },
  { value: TMeterType.Electricity, label: 'Electricity' },
]

const AddMeterReading: React.FC = () => {
  const [meterReading, setMeterReading] = useState('')
  const [meterType, setMeterType] = useState<TMeterOption | null>(null)
  const [formErrors, setFormErrors] = useState<TAddMeterReadingFormErrors>({})
  const [addMeterReading, { isSuccess }] = useAddMeterReadingMutation()
  const user = useUser()

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMeterReading(e.target.value)
  }

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault()

    const validatedFormData = meterReadingSchema.safeParse({
      meterReadingType: meterType?.value,
      readingValue: meterReading,
    })

    if (validatedFormData.success && user) {
      setFormErrors({})

      try {
        const { meterReadingType, readingValue } = validatedFormData.data

        addMeterReading({
          accountId: user?.id,
          meterReadingType,
          readingValue,
        })
      } catch (error) {
        console.error('Failed to add meter reading:', error)
      }
    } else {
      const zodError = validatedFormData.error as ZodError
      const updatedErrors: TAddMeterReadingFormErrors = {}

      zodError.errors.forEach((error) => {
        if (error.path.includes('meterReadingType')) {
          updatedErrors.meterReadingType = error.message
        }

        if (error.path.includes('readingValue')) {
          updatedErrors.readingValue = error.message
        }
      })

      setFormErrors(updatedErrors)
    }
  }

  useEffect(() => {
    if (isSuccess) {
      setMeterReading('')
      setMeterType(null)
    }
  }, [isSuccess])

  return (
    <FormWrapper submitHandler={submitHandler} heading="Add meter reading">
      {isSuccess && (
        <div className="bg-green-200 font-semibold p-4 flex flex-col gap-3 text-center">
          <p>Meter reading added!</p>
          <ButtonLink
            to={ROOT_PATHS.METER_READINGS}
            level="secondary"
            label="Go to my meter readings"
          />
        </div>
      )}
      <div className="flex flex-col gap-2 w-full max-w-96">
        <label htmlFor="meter-type">Meter type</label>
        <Select
          id="meter-type"
          value={meterType}
          onChange={setMeterType}
          options={METER_TYPES}
        />
        {formErrors.meterReadingType && (
          <p className="text-red-500">{formErrors.meterReadingType}</p>
        )}
      </div>
      <Input
        label="Meter reading"
        value={meterReading}
        onChange={changeHandler}
        error={formErrors.readingValue}
      />

      <Button type="submit" label="Add meter reading" />
    </FormWrapper>
  )
}
export default AddMeterReading

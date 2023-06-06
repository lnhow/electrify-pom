import './index.css'
import { useForm, SubmitHandler } from "react-hook-form"

export type TimerFormValues = {
  hours: number
  minutes: number
  seconds: number
}

export const defaultFormValues: TimerFormValues = {
  hours: 0,
  minutes: 0,
  seconds: 0,
}

export default function TimeInput(props: { defaultValues: TimerFormValues, onSubmit: (val: TimerFormValues) => void }) {
  const { register, handleSubmit, formState: { errors } } = useForm<TimerFormValues>({
    defaultValues: props.defaultValues,
  })
  const onFormSubmit: SubmitHandler<TimerFormValues> = (formData) => {
    props.onSubmit({
      hours: +formData.hours,
      minutes: +formData.minutes,
      seconds: +formData.seconds,
    })
  }

  return (
    <form className="form-timer" onSubmit={handleSubmit(onFormSubmit)}>
      <div className="input-group">
        <input
          className={`input ${errors.hours ? 'error' : ''}`}
          type="number"
          step="1"
          min="0"
          max="23"
          placeholder='hh'
          {...register('hours', { min: 0, max: 23 })}
        />
        <p>:</p>
        <input
          className={`input ${errors.minutes ? 'error' : ''}`}
          type="number"
          step="1"
          min="0"
          max="59"
          placeholder='mm'
          {...register('minutes', { min: 0, max: 59 })}
        />
        <p>:</p>
        <input
          className={`input ${errors.seconds ? 'error' : ''}`}
          type="number"
          step="1"
          min="0"
          max="59"
          placeholder='ss'
          {...register('seconds', { min: 0, max: 59 })}
        />
      </div>
      <button className='btn-timer' type="submit">Start timer</button>
    </form>
  )
}
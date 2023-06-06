import './index.css'
import { TimerFormValues } from '../TimeInput'
import { useCallback, useEffect, useRef, useState } from 'react'
// import { ipcRenderer } from 'electron'

const ONE_SECOND = 1000 //ms

export default function DisplayTimer(props: { timerValues: TimerFormValues, onStop: () => void }) {
  const currentTimeout = useRef<number>(0)
  const [currentHours, setCurrentHours] = useState(0)
  const [currentMinutes, setCurrentMinutes] = useState(0)
  const [currentSeconds, setCurrentSeconds] = useState(0)
  const [isTimerDone, setTimerDone] = useState(false)
  const intervalRef = useRef<number>(0)
  const processRemainingTime = useCallback((timeoutSeconds: number) => {
    const hours = Math.floor(timeoutSeconds / 3600)
    const minutes = Math.floor(timeoutSeconds % 3600 / 60)
    const seconds = Math.floor(timeoutSeconds % 60 % 60)
    setCurrentHours(hours)
    setCurrentMinutes(minutes)
    setCurrentSeconds(seconds)
    currentTimeout.current = timeoutSeconds
  }, [])
  const handleIntervalUpdate = useCallback(() => {
    const newTimeout = currentTimeout.current - 1
    console.log(newTimeout)
    if (newTimeout < 0) {
      clearInterval(intervalRef.current)
      setTimerDone(true)
      // ipcRenderer.send('focus-top')
      return
    }
    processRemainingTime(newTimeout)
  }, [processRemainingTime])

  const handleStopTimer = () => {
    clearInterval(intervalRef.current)
    setTimerDone(false)
    props.onStop()
  }

  useEffect(() => {
    const { hours, minutes, seconds} = props.timerValues
    console.log('[Dev Log] -> file: index.tsx:40 -> useEffect -> timerValues:', props.timerValues)
    const timeoutSeconds = ((+hours * 60 + minutes) * 60 + seconds)
    currentTimeout.current = timeoutSeconds
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    setTimerDone(false)
    handleIntervalUpdate()
    intervalRef.current = window.setInterval(() => {
      handleIntervalUpdate()
    }, ONE_SECOND)
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [props.timerValues, handleIntervalUpdate])

  return (
    <form className="form-timer">
      <div className="input-group">
        <input
          className={`input ${isTimerDone ? 'blink' : ''}`}
          type="number"
          min="0"
          max="24"
          value={currentHours}
          readOnly
        />
        <p>:</p>
        <input
          className={`input ${isTimerDone ? 'blink' : ''}`}
          type="number"
          min="0"
          max="59"
          value={currentMinutes}
          readOnly
        />
        <p>:</p>
        <input
          className={`input ${isTimerDone ? 'blink' : ''}`}
          type="number"
          min="0"
          max="59"
          value={currentSeconds}
          readOnly
        />
      </div>
      <button type="button" onClick={handleStopTimer}>Reset timer</button>
    </form>
  )
}
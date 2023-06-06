import React, { useState } from 'react';
import './App.css';
import TimeInput, { TimerFormValues, defaultFormValues } from './TimeInput';
import DisplayTimer from './DisplayTimer';

function App() {
  const [currentTimerTime, setCurrentTimerTime] = useState(defaultFormValues)
  const [isShowTimer, setShowTimer] = useState(false)
  const startTimer = (val: TimerFormValues) => {
    setCurrentTimerTime(val)
    setShowTimer(true)
  }
  const stopTimer = () => {
    setShowTimer(false)
  }
  return (
    <div className="app">
      {isShowTimer ? (
          <DisplayTimer
            timerValues={currentTimerTime}
            onStop={stopTimer}
          />
        ) : (
          <TimeInput
            defaultValues={currentTimerTime}
            onSubmit={startTimer}
          />
        )
      }
    </div>
  );
}

export default App;

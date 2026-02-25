import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatStandardTime = (date) => {
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()
    const ampm = hours >= 12 ? 'PM' : 'AM'

    hours = hours % 12
    hours = hours ? hours : 12

    const paddedHours = hours.toString().padStart(2, '0')
    const paddedMinutes = minutes.toString().padStart(2, '0')
    const paddedSeconds = seconds.toString().padStart(2, '0')

    return { paddedHours, paddedMinutes, paddedSeconds, ampm }
  }

  const formatDecimalTime = (date) => {
    // Total milliseconds passed today
    const msSinceMidnight = (date.getHours() * 3600000) +
      (date.getMinutes() * 60000) +
      (date.getSeconds() * 1000) +
      date.getMilliseconds()

    // 86,400,000 ms in a standard day
    // 100,000,000 "decimal ms" in a decimal day
    const decimalMs = (msSinceMidnight / 86400000) * 100000000

    const h = Math.floor(decimalMs / 10000000)
    const m = Math.floor((decimalMs % 10000000) / 100000)
    const s = Math.floor((decimalMs % 100000) / 1000)

    const paddedHours = h.toString().padStart(2, '0')
    const paddedMinutes = m.toString().padStart(2, '0')
    const paddedSeconds = s.toString().padStart(2, '0')
    const ampm = h >= 5 ? 'PM' : 'AM'

    return { paddedHours, paddedMinutes, paddedSeconds, ampm }
  }

  const std = formatStandardTime(time)
  const dec = formatDecimalTime(time)

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const dateString = `${days[time.getDay()]}, ${months[time.getMonth()]} ${time.getDate()}, ${time.getFullYear()}`

  return (
    <div className="app-container">
      <div className="clock-wrapper">
        <div className="clock-container glass-panel">
          <div className="clock-label">Standard Time</div>
          <div className="time-display">
            <span className="time-digit">{std.paddedHours}</span>
            <span className="time-separator glow">:</span>
            <span className="time-digit">{std.paddedMinutes}</span>
            <span className="time-separator glow">:</span>
            <span className="time-digit">{std.paddedSeconds}</span>
            <span className="time-ampm">{std.ampm}</span>
          </div>
          
        </div>

        <div className="clock-container glass-panel decimal-clock">
          <div className="clock-label">Decimal Time (Base-10)</div>
          <div className="time-display">
            <span className="time-digit">{dec.paddedHours}</span>
            <span className="time-separator glow">:</span>
            <span className="time-digit">{dec.paddedMinutes}</span>
            <span className="time-separator glow">:</span>
            <span className="time-digit">{dec.paddedSeconds}</span>
            <span className="time-ampm">{dec.ampm}</span>
          </div>
      
        </div>
      </div>
    </div>
  )
}

export default App

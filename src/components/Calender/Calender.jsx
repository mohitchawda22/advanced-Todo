import React, { useEffect, useState } from 'react'
import "./calender.scss"

function Calender() {
    const [currentTime, setCurrentTime] = useState(new Date())
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    const formatedDate = currentTime.toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    })
    const formatedtime = currentTime.toLocaleTimeString()
    return (
        <div className='calendar-container '>
            <p>📅</p>
            <p className="date">{formatedDate}</p>
            <p className="time">{formatedtime}</p>
        </div>
    )
}

export default Calender

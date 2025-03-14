import React, { useState } from "react";
import "./intervalPicker.css"

function IntervalPicker({onButtonClick}) {
  const [startDate, setStartDate] = useState(getBeginningOfCurrentMonthDate());
  const [endDate, setEndDate] = useState(getTodayDate());
  
  function getTodayDate() {
    return new Date().toISOString().substring(0, 10);
  }

  function getBeginningOfCurrentMonthDate() {
    let today = new Date();
    
    let timezoneOffset = today.getTimezoneOffset() * 60000;
    let daysOffset = 86400000 * (today.getDate() - 1);

    let firstDayOfCurrentMonth = 
        new Date(today.getTime() - timezoneOffset - daysOffset);

    return firstDayOfCurrentMonth.toISOString()
                                 .substring(0, 10);
  }

  return (
    <div className="intervalPicker">
      <label>Start date:</label>
      <input type="date" value={startDate} onChange = {(e) => {setStartDate(e.target.value);}}/>
      
      <label>End date:</label>
      <input type="date" value={endDate} onChange = {(e) => {setEndDate(e.target.value);}}/>

      <button onClick = {(e) => {onButtonClick(startDate, endDate);}}>Load Data</button>
    </div>
  );
}

export default IntervalPicker;

import React, { useState } from "react";
import "./intervalPicker.css"
import { getBeginningOfCurrentMonthDate, getTodayDate } from "../../utils/dateFunctions";

function IntervalPicker({onButtonClick}) {
  const [startDate, setStartDate] = useState(getBeginningOfCurrentMonthDate());
  const [endDate, setEndDate] = useState(getTodayDate());

  return (
    <div className="intervalPicker">
      <label>Start date:</label>
      <input type="date" value={startDate} onChange={(e) => {setStartDate(e.target.value);}}/>
      
      <label>End date:</label>
      <input type="date" value={endDate} onChange={(e) => {setEndDate(e.target.value);}}/>

      <button onClick={(e) => {onButtonClick(startDate, endDate);}}>Load Data</button>
    </div>
  );
}

export default IntervalPicker;

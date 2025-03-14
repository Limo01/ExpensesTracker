import React from "react";
import "../pages.css";
import IntervalPicker from "../../intervalPicker/intervalPicker";

import { fetchExpensesForInterval } from "../../../api/expenses_api";

function ExpensesPage() {
  function onIntervalPickerChange(startDate, endDate) {
    console.log("Query: " + startDate + " -> " + endDate);
    fetchExpensesForInterval(startDate, endDate).then(data => console.log(data));
  }

  return (
    <div className="page" id="expensesPage">
      <IntervalPicker onButtonClick = {onIntervalPickerChange}/>
    </div>
  );
}

export default ExpensesPage;

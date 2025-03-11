import React from "react";
import "../pages.css";
import IntervalPicker from "../../intervalPicker/intervalPicker";

function ExpensesPage() {
  return (
    <div className="page" id="expensesPage">
      <IntervalPicker />
    </div>
  );
}

export default ExpensesPage;

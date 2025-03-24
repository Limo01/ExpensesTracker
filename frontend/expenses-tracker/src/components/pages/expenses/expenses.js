import React, { useState, useEffect } from "react";
import "../pages.css";
import "./expenses.css";

import IntervalPicker from "../../intervalPicker/intervalPicker";
import ItemsList from "../../itemsList/itemsList";
import ItemAdder from "../../itemAdder/itemAdder";

import { fetchExpensesForInterval } from "../../../api/expenses_api";
import { itemsCategories, expensesCategories } from "../../../api/constants";

import { getBeginningOfCurrentMonthDate, getTodayDate } from "../../../utils/dateFunctions";
import { getTotalFromExpensesList } from "../../../utils/balanceCalculations";

function ExpensesPage() {
  const [categoriesData, setCategoriesData] = useState([]);

  const [dateInterval, setDateInterval] = useState({
    "startDate" : getBeginningOfCurrentMonthDate(),
    "endDate" : getTodayDate()
  });

  function processAndSetExpensesData(data) {
    let categoriesData = [];

    expensesCategories.forEach((category) => {
      if (data[category] === undefined) {
        categoriesData.push([]);
      } else {
        categoriesData.push(data[category]);
      }
    });

    setCategoriesData(categoriesData);
  }

  useEffect(() => {
    fetchExpensesData();
  }, [dateInterval]);

  function onIntervalPickerChange(startDate, endDate) {
    setDateInterval({
      "startDate" : startDate,
      "endDate" : endDate
    });
  }

  function fetchExpensesData() {
    fetchExpensesForInterval(
      dateInterval.startDate, dateInterval.endDate)
    .then(data => processAndSetExpensesData(data));
  }

  return (
    <div className="page" id="expensesPage">
      <div id="expensesPageHeader">
        <IntervalPicker onButtonClick={onIntervalPickerChange}/>
        <ItemAdder itemsCategories={itemsCategories} onItemAdd={fetchExpensesData}/>
      </div>
      <div id="expensesLists">
        <h1>Expenses</h1>
        <div id="itemsLists">
        {
          expensesCategories.map((category, index) => {
            return <ItemsList 
                      title={category} 
                      data={
                        categoriesData[index] === undefined? 
                          [] : 
                          categoriesData[index]} 
                      total={
                        categoriesData[index] === undefined? 
                          parseFloat(0).toFixed(2) : 
                          getTotalFromExpensesList(categoriesData[index])} 
                      key={index}/>
          })
        }
        </div>
      </div>
    </div>
  );
}

export default ExpensesPage;

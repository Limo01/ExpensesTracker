import React, { useState, useEffect } from "react";
import "../pages.css";
import "./expenses.css";

import IntervalPicker from "../../intervalPicker/intervalPicker";
import ItemsList from "../../itemsList/itemsList";
import ItemAdder from "../../itemAdder/itemAdder";

import { fetchExpensesForInterval } from "../../../api/expensesApi";
import { fetchIncomesForInterval } from "../../../api/incomesApi"; 
import { itemsCategories, expensesCategories } from "../../../api/constants";

import { getBeginningOfCurrentMonthDate, getTodayDate } from "../../../utils/dateFunctions";
import { getTotalFromItemsList } from "../../../utils/balanceCalculations";

function ExpensesPage() {
  const [categoriesData, setCategoriesData] = useState([]);
  const [incomesData, setIncomesData] = useState([]);

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
    fetchIncomsesData();
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

  function fetchIncomsesData() {
    fetchIncomesForInterval(
      dateInterval.startDate, dateInterval.endDate)
    .then(data => setIncomesData(data));
  }

  function onItemAddCallback() {
    fetchExpensesData();
    fetchIncomsesData();
  }

  return (
    <div className="page" id="expensesPage">
      <div id="expensesPageHeader">
        <IntervalPicker onButtonClick={onIntervalPickerChange}/>
        <ItemAdder itemsCategories={itemsCategories} onItemAdd={onItemAddCallback}/>
      </div>
      <div id="expensePageBody">
        <div id="expensesLists">
          <h1>Expenses</h1>
          <div class="itemsLists">
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
                            getTotalFromItemsList(categoriesData[index])} 
                        key={index}/>
            })
          }
          </div>
        </div>
        <div id="incomesLists">
          <h1>Incomes</h1>
          <div class="itemsLists" id="A">
            <ItemsList 
              title="" 
              data={
                incomesData === undefined? 
                  [] : 
                  incomesData} 
              total={
                incomesData === undefined? 
                  parseFloat(0).toFixed(2) : 
                  getTotalFromItemsList(incomesData)}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpensesPage;

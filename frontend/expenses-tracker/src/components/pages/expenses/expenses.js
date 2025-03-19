import React, { useState, useEffect } from "react";
import "../pages.css";
import "./expenses.css";

import IntervalPicker from "../../intervalPicker/intervalPicker";
import ItemsList from "../../itemsList/itemsList";
import ItemAdder from "../../itemAdder/itemAdder";

import { fetchExpensesForInterval } from "../../../api/expenses_api";

import { getBeginningOfCurrentMonthDate, getTodayDate } from "../../../utils/dateFunctions";
import { getTotalFromExpensesList } from "../../../utils/balanceCalculations";

function ExpensesPage() {
  const [categories, setCategories] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);

  function setData(data) {
    let categories = Object.keys(data);
    let categoriesData = [];

    categories.forEach((category) => {
      categoriesData.push(data[category]);
    });

    setCategories(categories);
    setCategoriesData(categoriesData);
  }

  useEffect(() => {
    fetchExpensesForInterval(
      getBeginningOfCurrentMonthDate(), getTodayDate())
    .then(data => setData(data));
  }, []);

  function onIntervalPickerChange(startDate, endDate) {
    fetchExpensesForInterval(startDate, endDate)
    .then(data => setData(data));;
  }

  return (
    <div className="page" id="expensesPage">
      <div id="expensesPageHeader">
        <IntervalPicker onButtonClick={onIntervalPickerChange}/>
        <ItemAdder/>
      </div>
      <div id="expensesLists">
        <h1>Expenses</h1>
        <div id="itemsLists">
        {
          categories.map((category, index) => {
            return <ItemsList 
                      title={category} 
                      data={categoriesData[index]} 
                      total={getTotalFromExpensesList(categoriesData[index])} 
                      key={index}/>
          })
        }
        </div>
      </div>
    </div>
  );
}

export default ExpensesPage;

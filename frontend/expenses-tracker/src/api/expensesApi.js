import { instance } from "./apiConstants";

export const fetchExpensesForInterval = async (start_date, end_date) => {
  try {
    const response = await instance.get("/expenses", {
        params: {
            "start_date" : start_date,
            "end_date" : end_date
        }
    })
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};

export const addExpense = async (expenseData) => {
  try {
    const response = await instance.post("/expenses", expenseData)
    return response.status;
  } catch (error) {
    console.error("Error adding data: ", error);
    throw error;
  }
};

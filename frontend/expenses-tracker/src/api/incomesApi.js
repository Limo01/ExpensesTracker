import { instance } from "./apiConstants";

export const fetchIncomesForInterval = async (start_date, end_date) => {
  try {
    const response = await instance.get("/incomes", {
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

export const addIncome = async (incomeData) => {
  try {
    const response = await instance.post("/incomes", incomeData)
    return response.status;
  } catch (error) {
    console.error("Error adding data: ", error);
    throw error;
  }
};
import { getTotalFromItemsList } from "../../utils/balanceCalculations";
import { PieChart } from '@mui/x-charts/PieChart';
import "./itemsStatistics.css";

function ItemsStatistics({expensesData, incomesData, expensesCategories}) {
  function calculateTotalExpenses(expensesData) {
    let total = 0;

    expensesData.forEach(expensesList => {
      total += getTotalFromItemsList(expensesList, false);
    });
    
    return total;
  }

  function prepareSeriesForPieChart(expensesData, incomesData, expensesCategories) {
    let stats = [];
    let key = 0;

    stats.push({
      key: key,
      value: getTotalFromItemsList(incomesData, false),
      label: "Incomes"
    });

    expensesCategories.forEach(expenseCategory => {
      stats.push({
        key: key,
        value: getTotalFromItemsList(expensesData[key], false),
        label : expenseCategory
      });

      key++;
    })
    
    return stats;
  }
  
  let totalExpenses = calculateTotalExpenses(expensesData);
  let totalIncomes = getTotalFromItemsList(incomesData, false);
  let balance = totalIncomes - totalExpenses;

  return (
    <div className="itemsStatistics">
      <div className="totalsStatistics">
        <p>Total Incomes: <span id="totalIncomes">{totalIncomes.toFixed(2)}€</span></p>
        <p>Total Expenses: <span id="totalExpenses">-{totalExpenses.toFixed(2)}€</span></p>
        <p>Balance: <span id="balance"
                          className={balance > 0? "profitBalance" : "lossBalance"}>
                    {balance.toFixed(2)}€</span></p>
      </div>
      <div>
        <PieChart
          series={[{
            data: prepareSeriesForPieChart(expensesData, incomesData, expensesCategories),
            valueFormatter: (point) => {return point.value.toFixed(2) + "€"},
            innerRadius: 0,
            outerRadius: 70,
            highlightScope: { fade: 'global', highlight: 'item' },
            faded: { color: 'gray' },
            startAngle: 0,
            endAngle: -360
          }]}
          width={450}
          height={200}
          margin={{ left: -50 }}/>
      </div>
    </div>
  );
}
 
export default ItemsStatistics;

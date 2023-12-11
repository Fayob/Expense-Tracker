import { useContext } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expense-context';
import { getDateMinusDays } from '../util/date';

function RecentExpenses() {
  const expenseCtx = useContext(ExpensesContext);
  const recentExpenses = expenseCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return (expense.date > date7DaysAgo) && (expense.date <= today);
  });
  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="No Expenses Registered for the past 7 days"
    />
  );
}

export default RecentExpenses;

import { useContext, useEffect, useState } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expense-context';
import { getDateMinusDays } from '../util/date';
import { fetchExpenses } from '../util/http';
import LoadingOverlay from '../UI/LoadingOverlay';
import ErrorOverlay from '../UI/ErrorOverlay';

function RecentExpenses() {
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState()
  const expenseCtx = useContext(ExpensesContext);

  useEffect(()=>{
    async function getExpenses() {
      setIsFetching(true)
      try {
        const expenses = await fetchExpenses()
        expenseCtx.setExpenses(expenses)   
      } catch (error) {
        setError("Could not fetch expenses")
      }
      setIsFetching(false)
    }
    getExpenses()
  }, [])

  function errorHandler() {
    setError(null)
  }

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />
  }

  if (isFetching) {
    return <LoadingOverlay />
  }

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

import { useContext } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expense-context';

function AllExpenses() {
  const expenseCtx = useContext(ExpensesContext);

  return (
    <ExpensesOutput
      expenses={expenseCtx.expenses}
      expensesPeriod="Total"
      fallbackText="No registered expenses found"
    />
  );
}

export default AllExpenses;

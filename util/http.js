import axios from 'axios';

const BACKEND_URL =
  'https://react-native-expense-tra-d52b6-default-rtdb.firebaseio.com';

export async function storeExpense(expenseData) {
  const response = await axios.post(BACKEND_URL + '/expenses.json', expenseData);
  const id = response.data.name
  return id;
}


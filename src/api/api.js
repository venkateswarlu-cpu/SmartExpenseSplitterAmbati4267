import axios from 'axios'

const API_BASE = 'https://smartexpensesplitter-ambati-4.onrender.com/api' // Backend URL

// Fetch all groups
export const getGroups = async () => {
  const res = await axios.get(`${API_BASE}/groups`)
  return res.data
}

// Fetch all expenses
export const getExpenses = async () => {
  const res = await axios.get(`${API_BASE}/expenses`)
  return res.data
}

// Add a new expense
export const addExpense = async (expense) => {
  const res = await axios.post(`${API_BASE}/expenses`, expense)
  return res.data
}

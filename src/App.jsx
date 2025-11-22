import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [groups, setGroups] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({ name: "", amount: "", group: "" });

  useEffect(() => {
    fetchGroups();
    fetchExpenses();
  }, []);

  const fetchGroups = async () => {
    const res = await axios.get("https://smartexpensesplitter-ambati-4.onrender.com/api/groups");
    setGroups(res.data);
  };

  const fetchExpenses = async () => {
    const res = await axios.get("https://smartexpensesplitter-ambati-4.onrender.com/api/expenses");
    setExpenses(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.amount || !form.group) return alert("All fields required");
    await axios.post("http://localhost:5000/api/expenses", {
      name: form.name,
      amount: Number(form.amount),
      group: form.group,
    });
    setForm({ name: "", amount: "", group: "" });
    fetchExpenses();
  };

  return (
    <div className="container">
      <h1>Smart Expense Splitter</h1>

      <h2>Groups</h2>
      {groups.length ? (
        <ul>{groups.map((g) => <li key={g._id}>{g.name}</li>)}</ul>
      ) : (
        <p>No groups yet</p>
      )}

      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Expense Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />
        <select
          value={form.group}
          onChange={(e) => setForm({ ...form, group: e.target.value })}
        >
          <option value="">Select Group</option>
          {groups.map((g) => (
            <option key={g._id} value={g._id}>
              {g.name}
            </option>
          ))}
        </select>
        <button type="submit">Add Expense</button>
      </form>

      <h2>Expenses</h2>
      {expenses.length ? (
        <ul>
          {expenses.map((exp) => (
            <li key={exp._id}>
              {exp.name} - ₹{exp.amount} [{exp.group?.name}]
            </li>
          ))}
        </ul>
      ) : (
        <p>No expenses yet</p>
      )}
    </div>
  );
}

export default App;

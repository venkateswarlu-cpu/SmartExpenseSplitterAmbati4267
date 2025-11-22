import React, { useState, useEffect } from 'react'

const ExpenseForm = ({ groups, onAddExpense }) => {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [group, setGroup] = useState('')

  useEffect(() => {
    if (groups.length > 0) setGroup(groups[0]._id)
  }, [groups])

  const handleSubmit = async (e) => {
    e.preventDefault() // Prevent page reload
    if (!name || !amount || !group) return
    await onAddExpense({ name, amount: parseFloat(amount), group })
    setName('')
    setAmount('')
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
      <input
        placeholder="Expense Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select value={group} onChange={(e) => setGroup(e.target.value)}>
        {groups.map((g) => (
          <option key={g._id} value={g._id}>{g.name}</option>
        ))}
      </select>
      <button type="submit">Add Expense</button>
    </form>
  )
}

export default ExpenseForm

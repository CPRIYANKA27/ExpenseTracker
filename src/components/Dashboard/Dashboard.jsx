import { useState } from "react";
import WalletExpenses from "../WalletExpenses/WalletExpenses";
import ExpenseTable from "../ExpenseTable/ExpenseTable";
import LinebarChart from "../LinebarChart/LinebarChart";
import PieChart from "../PieChart/PieChart";
import "./Dashboard.css";

const Dashboard = () => {
  // Load stored expenses from localStorage
  const storedExpenses = localStorage.getItem("expenses");
  const initialExpenses = storedExpenses ? JSON.parse(storedExpenses) : [];

  // Wallet balance state (defaults to 5000 if not in storage)
  const [walletBalance, setWalletBalance] = useState(
    localStorage.getItem("walletBalance")
      ? JSON.parse(localStorage.getItem("walletBalance"))
      : 5000
  );

  // Expenses state
  const [expenses, setExpenses] = useState(initialExpenses);

  // Calculate total expenses
  const getTotalExpenses = (list = expenses) => {
    return list.reduce(
      (total, expense) => total + parseInt(expense.price || 0, 10),
      0
    );
  };

  // Handle expenses list update
  const handleExpensesListUpdate = (updatedExpenses) => {
    setExpenses(updatedExpenses);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));

    const totalBalance = 5000 - getTotalExpenses(updatedExpenses);
    setWalletBalance(totalBalance);
    localStorage.setItem("walletBalance", JSON.stringify(totalBalance));
  };

  // Expense categories
  const categories = [
    "Food",
    "Entertainment",
    "Travel",
    "Shopping",
    "Grocery",
    "Others",
  ];

  return (
    <div className="dashboard-container">
      {/* Top Row: Wallet, Expenses, Pie Chart */}
      <div className="top-section">
        <WalletExpenses
          handleExpenseListUpdate={handleExpensesListUpdate}
          categories={categories}
          expenses={expenses}
          setExpenses={setExpenses}
          getTotalExpenses={getTotalExpenses}
          walletBalance={walletBalance}
          setWalletBalance={setWalletBalance}
        />
        {expenses.length > 0 && (
          <div className="piechart-section">
            <PieChart data={expenses} categories={categories} />
          </div>
        )}
      </div>

      {/* Bottom Row: Recent Transactions + Top Expenses */}
      {expenses.length > 0 && (
        <div className="bottom-section">
          <ExpenseTable
            expenseData={expenses}
            handleExpenseListUpdate={handleExpensesListUpdate}
            categories={categories}
          />
          <LinebarChart data={expenses} categories={categories} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;

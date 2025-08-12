import { useState } from "react";
import WalletExpenses from "../WalletExpenses/WalletExpenses";
import ExpenseTable from "../ExpenseTable/ExpenseTable";
import LinebarChart from "../LinebarChart/LinebarChart";
import PieChart from "../PieChart/PieChart";
import "./Dashboard.css";

const Dashboard = () => {
  const [walletBalance, setWalletBalance] = useState(
    localStorage.getItem("walletBalance")
      ? JSON.parse(localStorage.getItem("walletBalance"))
      : 5000
  );

  const [expenses, setExpenses] = useState(
    localStorage.getItem("expenses")?.length > 0
      ? JSON.parse(localStorage.getItem("expenses"))
      : []
  );

  const handleExpensesListUpdate = (updatedExpenses) => {
    setExpenses(updatedExpenses);
    const totalBalance =
      Number(localStorage.getItem("totalBalance") || 5000) -
      getTotalExpenses(updatedExpenses);
    setWalletBalance(totalBalance);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  };

  const getTotalExpenses = (list = expenses) => {
    return list.reduce(
      (total, expense) => total + parseInt(expense.price || 0, 10),
      0
    );
  };

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

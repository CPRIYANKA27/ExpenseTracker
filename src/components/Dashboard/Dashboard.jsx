import { useState } from "react";
import WalletExpenses from "../WalletExpenses/WalletExpenses";
import ExpenseTable from "../ExpenseTable/ExpenseTable";
import LinebarChart from "../LinebarChart/LinebarChart";
import PieChart from "../PieChart/PieChart"; // ✅ Added
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
      localStorage.getItem("totalBalance") - getTotalExpenses();
    setWalletBalance(totalBalance);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  };

  const getTotalExpenses = () => {
    return expenses.reduce(
      (total, expense) => total + parseInt(expense.price, 10),
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
        <div className="dashboard-info-container">
          <ExpenseTable
            expenseData={expenses}
            handleExpenseListUpdate={handleExpensesListUpdate}
            categories={categories}
          />
          <LinebarChart data={expenses} categories={categories} />
          <PieChart data={expenses} categories={categories} /> {/* ✅ Added */}
        </div>
      )}
    </div>
  );
};

export default Dashboard;

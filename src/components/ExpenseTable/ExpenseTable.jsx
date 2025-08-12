import React, { useState } from "react";
import Modal from "react-modal";
import {
  FaUtensils,
  FaFilm,
  FaPlane,
  FaShoppingCart,
  FaShoppingBasket,
  FaEllipsisH,
  FaEdit,
  FaTimesCircle,
} from "react-icons/fa";
import "./ExpenseTable.css";

Modal.setAppElement("#root");

const icons = {
  Food: <FaUtensils />,
  Entertainment: <FaFilm />,
  Travel: <FaPlane />,
  Shopping: <FaShoppingCart />,
  Grocery: <FaShoppingBasket />,
  Others: <FaEllipsisH />,
};

const modalStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    maxWidth: "500px",
    background: "rgba(255, 255, 255, 0.6)",
    borderRadius: "10px",
    border: "1px solid rgba(255, 255, 255, 0.18)",
    boxShadow: "0 8px 12px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(10px)",
  },
};

const ExpenseTable = ({ expenseData, handleExpenseListUpdate, categories }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currExpense, setCurrExpense] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrExpense((prevState) => ({ ...prevState, [name]: value }));
  };

  const getCategoryIcon = (category) => {
    return icons[category] || <FaEllipsisH />;
  };

  const openModal = (expense) => {
    setIsModalOpen(true);
    setCurrExpense(expense);
  };

  const handleDelete = (id) => {
    const updatedExpenses = expenseData.filter((expense) => expense.id !== id);
    handleExpenseListUpdate(updatedExpenses);
  };

  const editExpense = (e) => {
    e.preventDefault();
    const expenseIndex = expenseData.findIndex(
      (expense) => expense.id === currExpense.id
    );
    const updatedExpenses = [...expenseData];
    if (expenseIndex !== -1) {
      updatedExpenses[expenseIndex] = {
        ...updatedExpenses[expenseIndex],
        ...currExpense,
      };
      handleExpenseListUpdate(updatedExpenses);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <div className="expense-container">
        <h2>Recent Transactions</h2>
        <br />
        <div className="expense-table-container">
          {expenseData.map((item) => (
            <div className="expense-row" key={item.id}>
              <div className="expense-row-icon-title">
                <div className="expense-icon">
                  {React.cloneElement(getCategoryIcon(item.category), {
                    className: "expense-category-icon",
                  })}
                </div>
                <div className="expense-title-date">
                  <div className="expense-title">{item.title}</div>
                  {/* Show raw date string for tests */}
                  <div className="expense-date">{item.date}</div>
                </div>
              </div>
              <div className="expense-price-edit-delete-container">
                <div className="expense-price">
                  ₹{parseInt(item.price, 10).toLocaleString()}
                </div>
                <button
                  className="action-btn delete-btn"
                  onClick={() => handleDelete(item.id)}
                >
                  <FaTimesCircle />
                </button>
                <button
                  className="action-btn edit-btn"
                  onClick={() => openModal(item)}
                >
                  <FaEdit />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Expense Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={modalStyle}
        contentLabel="Edit Expense"
      >
        <h2 className="modal-header">Edit Expense</h2>
        <form className="modal-form-expense" onSubmit={editExpense}>
          <input
            name="title"
            placeholder="Title"
            value={currExpense.title || ""}
            onChange={handleInputChange}
            required
          />
          <input
            name="price"
            placeholder="Price"
            type="number"
            value={currExpense.price || ""}
            onChange={handleInputChange}
            required
          />
          <select
            className="select-option"
            name="category"
            value={currExpense.category || ""}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          <input
            name="date"
            placeholder="Date"
            type="date"
            value={currExpense.date || ""}
            onChange={handleInputChange}
            required
          />
          <div>
            <button className="glassmorphismButton" type="submit">
              Save
            </button>
            <button
              className="glassmorphismButton"
              type="button"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ExpenseTable;

import React from "react";
import { useBudget } from "../contexts/BudgetContext";
import BudgetCard from "./BudgetCard";

const TotalBudgetCard = (props) => {
  const { budgets, expenses } = useBudget();
  const max = budgets.reduce(
    (total, budget) => parseFloat(total) + budget.max,
    0
  );
  const amount = expenses.reduce(
    (total, expense) => total + parseFloat(expense.amount),
    0
  );

  if (max === 0) return null;
  return (
    <>
      <BudgetCard
        amount={amount}
        name="Total"
        gray
        max={max}
        hideButton={true}
      />
    </>
  );
};

export default TotalBudgetCard;

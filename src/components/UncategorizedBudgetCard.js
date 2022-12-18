import React from "react";
import { UNCATEGORIZED_BUDGET_ID, useBudget } from "../contexts/BudgetContext";
import BudgetCard from "./BudgetCard";

const UncategorizedBudgetCard = (props) => {
  const { getBudgetExpenses } = useBudget();
  const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
    (total, expense) => parseFloat(total) + parseFloat(expense.amount),
    0
  );

  if (amount === 0) return null;
  return (
    <>
      <BudgetCard amount={amount} name="Uncategorized" gray {...props} />
    </>
  );
};

export default UncategorizedBudgetCard;

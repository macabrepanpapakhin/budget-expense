import React from "react";
import { useContext } from "react";
import { v4 as uuidV4 } from "uuid";
import useLocalStorage from "../hooks/uselocalstorage";
const BudgetContext = React.createContext();

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized";

export function useBudget() {
  return useContext(BudgetContext);
}

export const BudgetProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage("budgets", []);
  const [expenses, setExpenses] = useLocalStorage("expenses", []);
  function getBudgetExpenses(budgetID) {
    return expenses.filter((expense) => expense.budgetID === budgetID);
  }
  function addExpense({ description, amount, budgetID }) {
    setExpenses((previousExpense) => {
      return [
        ...previousExpense,
        { id: uuidV4(), description, amount, budgetID },
      ];
    });
  }
  function addBudget({ name, max }) {
    setBudgets((previousBudgets) => {
      if (previousBudgets.find((budget) => budget.name === name)) {
        return previousBudgets;
      }
      return [...previousBudgets, { id: uuidV4(), name, max }];
    });
  }
  function deleteBudget({ id }) {
    //dealing with uncategorized expense
    setExpenses((previousExpense) => {
      return previousExpense.map((expense) => {
        if (expense.budgetID !== id) return expense;
        return { ...expense, budgetID: UNCATEGORIZED_BUDGET_ID };
      });
    });
    setBudgets((previousBudgets) => {
      return previousBudgets.filter((budget) => budget.id !== id);
    });
  }
  function deleteExpense({ id }) {
    setExpenses((previousExpense) => {
      return previousExpense.filter((expense) => expense.id !== id);
    });
  }
  return (
    <BudgetContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

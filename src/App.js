import { Container, Stack, Button } from "react-bootstrap";
import BudgetCard from "./components/BudgetCard";
import AddBudgetModel from "./components/AddBudgetModel";
import { useState } from "react";
import { UNCATEGORIZED_BUDGET_ID, useBudget } from "./contexts/BudgetContext";
import AddExpenseModel from "./components/AddExpenseModel";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";
import ViewExpensesModel from "./components/ViewExpensesModel";
function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [addExpenseModalBudgetID, setAddExpenseModalBudgetID] = useState();
  const [viewExpensesModelBudgetID, setViewExpensesModelBudgetID] =
    useState(false);
  const { budgets, getBudgetExpenses } = useBudget();

  function openAddExpenseModal(budgetID) {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetID(budgetID);
  }
  return (
    <>
      <Container>
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>
            Add Budget
          </Button>
          <Button variant="outline-primary" onClick={openAddExpenseModal}>
            Add Expense
          </Button>
        </Stack>
        <div
          style={{
            display: "grid",
            gridTemplateColumn: "repeat(auto-fill,minmax(300px,1fr))",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
          {budgets.map((budget) => {
            const amount = getBudgetExpenses(budget.id).reduce(
              (total, expense) => parseFloat(total) + expense.amount,
              0
            );
            return (
              <BudgetCard
                name={budget.name}
                amount={amount}
                max={budget.max}
                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                onViewExpenseClick={() =>
                  setViewExpensesModelBudgetID(budget.id)
                }
              ></BudgetCard>
            );
          })}
        </div>
      </Container>
      <AddBudgetModel
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />
      <AddExpenseModel
        defaultBudgetID={addExpenseModalBudgetID}
        show={showAddExpenseModal}
        handleClose={() => setShowAddExpenseModal(false)}
      />
      <UncategorizedBudgetCard
        onAddExpenseClick={openAddExpenseModal}
        onViewExpenseClick={() =>
          setViewExpensesModelBudgetID(UNCATEGORIZED_BUDGET_ID)
        }
      />
      <TotalBudgetCard />
      <ViewExpensesModel
        budgetID={viewExpensesModelBudgetID ? viewExpensesModelBudgetID : null}
        handleClose={() => {
          setViewExpensesModelBudgetID();
        }}
      />
    </>
  );
}

export default App;

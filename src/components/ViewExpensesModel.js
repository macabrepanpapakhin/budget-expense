import { Modal, Button, Stack } from "react-bootstrap";
import { UNCATEGORIZED_BUDGET_ID, useBudget } from "../contexts/BudgetContext";
import { currencyFormatter } from "../utils";
const ViewExpensesModel = ({ budgetID, handleClose }) => {
  const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } =
    useBudget();

  const expenses = getBudgetExpenses(budgetID);
  const budget =
    UNCATEGORIZED_BUDGET_ID === budgetID
      ? { name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID }
      : budgets.find((b) => b.id === budgetID);

  return (
    <Modal show={budgetID != null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap="2">
            <div>Expense - {budget?.name}</div>
            {budgetID !== UNCATEGORIZED_BUDGET_ID && (
              <Button
                onClick={() => {
                  deleteBudget(budget);
                  handleClose();
                }}
                variant="outline-danger"
              >
                Delete
              </Button>
            )}
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="vertical" gap="3">
          {expenses.map((expense) => (
            <Stack direction="horizontal" gap="2" key={expense.id}>
              <div className="me-auto fs-4">{expense.description}</div>
              <div className="fs-5">
                {currencyFormatter.format(expense.amount)}
              </div>
              <Button
                size="sm"
                variant="outline-danger"
                onClick={() => {
                  deleteExpense(expense);
                }}
              >
                $times;
              </Button>
            </Stack>
          ))}
        </Stack>
      </Modal.Body>
    </Modal>
  );
};

export default ViewExpensesModel;

import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useRef } from "react";
import { useBudget } from "../contexts/BudgetContext";
import { UNCATEGORIZED_BUDGET_ID } from "../contexts/BudgetContext";
const AddExpenseModel = ({ show, handleClose, defaultBudgetID }) => {
  const descriptionRef = useRef();
  const amountRef = useRef();
  const budgetIDRef = useRef();
  const { addExpense, budgets } = useBudget();
  function handleSubmit(e) {
    e.preventDefault();
    addExpense({
      description: descriptionRef.current.value,
      amount: amountRef.current.value,
      budgetID: budgetIDRef.current.value,
    });
    handleClose();
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              ref={descriptionRef}
              type="text"
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="amount">
            <Form.Label>Amount Spending</Form.Label>
            <Form.Control
              type="number"
              required
              min={1}
              ref={amountRef}
              step={0.01}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="budgetID">
            <Form.Label>Budget</Form.Label>
            <Form.Select
              defaultValue={defaultBudgetID}
              type="number"
              ref={budgetIDRef}
            >
              <option id={UNCATEGORIZED_BUDGET_ID}>Uncategorized</option>
              {budgets.map((budget) => (
                <option key={budget.id} value={budget.id}>
                  {budget.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default AddExpenseModel;

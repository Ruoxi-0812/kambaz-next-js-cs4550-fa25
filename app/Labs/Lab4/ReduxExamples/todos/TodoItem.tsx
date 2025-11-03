"use client";

import { Button, ListGroupItem } from "react-bootstrap";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

type Todo = { id: string; title: string };
type Props = { todo: Todo };

export default function TodoItem({ todo }: Props) {
  const dispatch = useDispatch();

  return (
    <ListGroupItem className="d-flex justify-content-between align-items-center">
      <span className="fw-normal">{todo.title}</span>
      <div className="d-flex gap-2">
        <Button
          size="sm"
          variant="primary"
          onClick={() => dispatch(setTodo(todo))}
          id="wd-set-todo-click"
        >
          Edit
        </Button>
        <Button
          size="sm"
          variant="danger"
          onClick={() => dispatch(deleteTodo(todo.id))}
          id="wd-delete-todo-click"
        >
          Delete
        </Button>
      </div>
    </ListGroupItem>
  );
}

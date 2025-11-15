"use client";

import React, { useEffect, useState } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import FormControl from "react-bootstrap/FormControl";
import { FaTrash, FaPlusCircle } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { FaPencil } from "react-icons/fa6";
import type { AxiosError } from "axios";

import * as client from "./client";
import type { Todo } from "./client";

export default function WorkingWithArraysAsynchronously() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchTodos = async () => {
    try {
      const data = await client.fetchTodos();
      setTodos(data);
      setErrorMessage(null);
    } catch (error: unknown) {
      const err = error as AxiosError<{ message?: string }>;
      console.error(err);
      setErrorMessage(
        err.response?.data?.message ?? "Unable to fetch todos from server."
      );
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const createNewTodo = async () => {
    try {
      const updated = await client.createNewTodo();
      setTodos(updated);
      setErrorMessage(null);
    } catch (error: unknown) {
      const err = error as AxiosError<{ message?: string }>;
      console.error(err);
      setErrorMessage(
        err.response?.data?.message ?? "Unable to create todo (GET /create)."
      );
    }
  };

  const postNewTodo = async () => {
    try {
      const newTodo = await client.postNewTodo({
        title: "New Posted Todo",
        completed: false,
      });
      setTodos([...todos, newTodo]);
      setErrorMessage(null);
    } catch (error: unknown) {
      const err = error as AxiosError<{ message?: string }>;
      console.error(err);
      setErrorMessage(
        err.response?.data?.message ?? "Unable to create todo (POST)."
      );
    }
  };

  const removeTodo = async (todo: Todo) => {
    try {
      const updated = await client.removeTodo(todo);
      setTodos(updated);
      setErrorMessage(null);
    } catch (error: unknown) {
      const err = error as AxiosError<{ message?: string }>;
      console.error(err);
      setErrorMessage(
        err.response?.data?.message ??
          `Unable to remove Todo with ID ${todo.id}`
      );
    }
  };

  const deleteTodo = async (todo: Todo) => {
    try {
      await client.deleteTodo(todo);
      const newTodos = todos.filter((t) => t.id !== todo.id);
      setTodos(newTodos);
      setErrorMessage(null);
    } catch (error: unknown) {
      const err = error as AxiosError<{ message?: string }>;
      console.error(err);
      setErrorMessage(
        err.response?.data?.message ??
          `Unable to delete Todo with ID ${todo.id}`
      );
    }
  };

  const editTodo = (todo: Todo) => {
    const updatedTodos = todos.map((t) =>
      t.id === todo.id ? { ...todo, editing: true } : t
    );
    setTodos(updatedTodos);
  };

  const updateTodo = async (todo: Todo) => {
    try {
      await client.updateTodo(todo);
      setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
      setErrorMessage(null);
    } catch (error: unknown) {
      const err = error as AxiosError<{ message?: string }>;
      console.error(err);
      setErrorMessage(
        err.response?.data?.message ??
          `Unable to update Todo with ID ${todo.id}`
      );
    }
  };

  return (
    <div id="wd-asynchronous-arrays">
      <h3>Working with Arrays Asynchronously</h3>

      {errorMessage && (
        <div
          id="wd-todo-error-message"
          className="alert alert-danger mb-2 mt-2"
        >
          {errorMessage}
        </div>
      )}

      <h4>
        Todos
        <FaPlusCircle
          onClick={createNewTodo}
          className="text-success float-end fs-3"
          id="wd-create-todo"
        />
        <FaPlusCircle
          onClick={postNewTodo}
          className="text-primary float-end fs-3 me-3"
          id="wd-post-todo"
        />
      </h4>

      <ListGroup>
        {todos.map((todo) => (
          <ListGroupItem key={todo.id}>
            <FaTrash
              onClick={() => removeTodo(todo)}
              className="text-danger float-end mt-1"
              id="wd-remove-todo"
            />
            <TiDelete
              onClick={() => deleteTodo(todo)}
              className="text-danger float-end me-2 fs-3"
              id="wd-delete-todo"
            />
            <FaPencil
              onClick={() => editTodo(todo)}
              className="text-primary float-end me-2 mt-1"
            />
            <input
              type="checkbox"
              className="form-check-input me-2 float-start"
              checked={todo.completed}
              onChange={(e) =>
                updateTodo({ ...todo, completed: e.target.checked })
              }
            />

            {!todo.editing ? (
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.title}
              </span>
            ) : (
              <FormControl
                className="w-50 float-start"
                defaultValue={todo.title}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    updateTodo({ ...todo, editing: false });
                  }
                }}
                onChange={(e) =>
                  updateTodo({
                    ...todo,
                    title: e.target.value,
                    editing: true,
                  })
                }
              />
            )}
          </ListGroupItem>
        ))}
      </ListGroup>

      <hr />
    </div>
  );
}

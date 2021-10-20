
import { createAsyncThunk } from "@reduxjs/toolkit"
const API_URL = process.env.API_URL;
const headers = {
    "content-type": "application/json",
    Accept: "application/json",
};
export const loadTodos = createAsyncThunk('todos/loadTodos', async () => {
    try {
        const query = `query getTodos {
        todos {
          id
          content
          isCompleted
          createdAt}}`;

        const response = await fetch(API_URL, {
            method: "POST",
            headers,
            body: JSON.stringify({
                query,
            }),
        });
        const res = await response.json();
        const todos = res.data?.todos;
        return todos;
    } catch (error) {
        throw 'error loading data';
    }
});

export const createTodo = createAsyncThunk('todos/createTodo', async (content) => {
    try {
        const query = `mutation createTodo {
        createTodo(input: { content: "${content}" }) {
          id
          content
          createdAt
          isCompleted
        }
      }`;
        const response = await fetch(API_URL, {
            method: "POST",
            headers,
            body: JSON.stringify({ query }),
        });
        const todo = (await response.json()).data.createTodo;
        return todo;
    } catch (error) {
        return error;
    }
});

export const removeTodo = createAsyncThunk('todos/removeTodo', async (id) => {
    try {
        const query = `mutation removeTodo {
        removeTodo(id: "${id}")
      }`;
        const response = await fetch(API_URL, {
            method: "POST",
            headers,
            body: JSON.stringify({ query }),
        });
        await response.json();
        return id;
    } catch (error) {
        return error;
    }
});

export const updateTodoStatus = createAsyncThunk('todos/updateTodoStatus', async ({ id, isCompleted }) => {
    try {
        const query = `mutation updateTodoStatus {
          updateTodoStatus(id: "${id}", isCompleted: ${isCompleted})
        }`;
        const response = await fetch(API_URL, {
            method: "POST",
            headers,
            body: JSON.stringify({ query }),
        });
        await response.json().data;
        return ({ id, isCompleted })
    } catch (error) {
        return error;
    }
});
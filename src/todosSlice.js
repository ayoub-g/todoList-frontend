import { createSlice } from "@reduxjs/toolkit"
import { createSelector } from "reselect";
import { createTodo, loadTodos, removeTodo, updateTodoStatus } from "./todosThunks";
const initialState = { data: [], isLoading: false, loadingError: false }

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    extraReducers: (builder) => {

        builder
            .addCase(loadTodos.pending, (state) => { state.isLoading = true })
            .addCase(loadTodos.fulfilled, (state, action) => {
                state.data = Array.isArray(action.payload) ? action.payload : [];
                state.isLoading = false
            })
            .addCase(loadTodos.rejected, (state) => { state.loadingError = true; state.isLoading = false })
            .addCase(createTodo.fulfilled, (state, action) => { state.data.push(action.payload) })
            .addCase(updateTodoStatus.fulfilled, (state, action) => {

                state.data = state.data.map((todo) => {
                    if (todo.id === action.payload.id) {
                        todo.isCompleted = action.payload.isCompleted;
                    }
                    return todo;
                })
            })
            .addCase(removeTodo.fulfilled, (state, action) => {
                state.data = state.data.filter(todo => todo.id !== action.payload)
            })
    },
});

const selectTodos = (state) => state.todos.data || [];

export const selectTodosLoading = (state) => state.todos.isLoading;

export const selectIncompletedTodos = createSelector(selectTodos, (todos) =>
    todos.filter((todo) => !todo.isCompleted)
);
export const selectCompletedTodos = createSelector(selectTodos, (todos) =>
    todos.filter((todo) => todo.isCompleted)
);
export const selectLoadingError = (state) => state.todos.loadingError;

export default todosSlice.reducer;
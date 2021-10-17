import React from "react";
import { useSelector } from 'react-redux'

import { Box } from "@mui/material";

import TodoListItem from "./TodoListItem";
import { selectIncompletedTodos } from '../todosSlice'

const IncompletedTodos = () => {

  const getIncompletedTodos = useSelector(state => selectIncompletedTodos(state))
  return (
    <Box>
      {getIncompletedTodos.map((todo, index) => (
        <TodoListItem
          expandTasks={true}
          key={index}
          todo={todo}
        />
      ))}
    </Box>
  );
};

export default IncompletedTodos;

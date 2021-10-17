import React, { useState } from "react";
import { useSelector } from 'react-redux'

import { ChevronRight, ExpandMore } from "@mui/icons-material";
import { Typography, Box, IconButton } from "@mui/material";
import { makeStyles, withStyles } from "@mui/styles";

import TodoListItem from "./TodoListItem";
import { selectCompletedTodos } from '../todosSlice';

const useStyles = makeStyles({
  noSelect: {
    "-webkit-touch-callout": "none",
    " -webkit-user-select": "none",
    "-khtml-user-select": "none",
    "-moz-user-select": "none",
    "-ms-user-select": "none",
    "user-select": "none",
  },
  completedTasksLabel: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginLeft: ".5em",
  },
});
const CustomIconButton = withStyles({
  root: {
    boxShadow: "none",
    "&:hover": {
      boxShadow: "none",
      backgroundColor: "transparent",
    },
  },
})(IconButton);


const CompletedTodos = () => {


  const getCompletedTodos = useSelector(state => selectCompletedTodos(state));
  const classes = useStyles();
  const [expandTasks, setExpandTasks] = useState(true);

  return (
    <Box className={classes.completedTodos}>
      <Box className={`${classes.completedTasksLabel} ${classes.noSelect}`}>
        <CustomIconButton
          onClick={() => {
            setExpandTasks((expandTasks) => !expandTasks);
          }}
        >
          {expandTasks ? <ExpandMore /> : <ChevronRight />}
        </CustomIconButton>
        <Typography variant="h5">Completed {getCompletedTodos.length}</Typography>
      </Box>
      {getCompletedTodos.map((todo, index) => (
        <TodoListItem
          key={index}
          expandTasks={expandTasks}
          timeout={index * 100}
          todo={todo}
        />
      ))}
    </Box>
  );
};
export default CompletedTodos;

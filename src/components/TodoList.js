import React, { useEffect, } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { Box, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { selectIncompletedTodos, selectCompletedTodos, selectTodosLoading } from "../todosSlice"
import { loadTodos } from '../todosThunks';

import CompletedTodos from "./CompletedTodos";
import IncompletedTodos from "./IncompletedTodos";
const useStyles = makeStyles({
  noSelect: {
    "-webkit-touch-callout": "none",
    " -webkit-user-select": "none",
    "-khtml-user-select": "none",
    "-moz-user-select": "none",
    "-ms-user-select": "none",
    "user-select": "none",
  }, newTodoForm: {
    width: "100%",
    padding: "1em",
    marginBottom: "1em",
    position: "absolute",
    zIndex: "99",
    top: "40%",
  },
  box: {
    maxWidth: "600px",
    width: "90%",
    margin: "0 auto",
    zIndex: "-100",
    paddingBottom: "75px",
    marginTop: 30, zIndex: -100
  },
  progressContainer: {
    height: "100%",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "0",
  },
});

const TodoList = () => {

  const isLoading = useSelector((state) => selectTodosLoading(state));
  const completedTodos = useSelector(state => selectCompletedTodos(state));
  const incompletedTodos = useSelector(state => selectIncompletedTodos(state));
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(loadTodos());
  }, [dispatch]);

  // loading component, renders while todos are loading from server
  const renderLoading = <Box className={classes.progressContainer}>
    <CircularProgress />
  </Box>

  const renderContent = <Box className={classes.box}>
    {incompletedTodos.length > 0 ? (
      <IncompletedTodos incompletedTodos={incompletedTodos} />
    ) : null}
    {completedTodos.length > 0 ? (
      <CompletedTodos completedTodos={completedTodos} />
    ) : null}
  </Box>

  return isLoading ? renderLoading : renderContent;
};

/* connect this component to redux */
export default TodoList;

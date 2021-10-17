import React from "react";
import { useDispatch, useSelector } from 'react-redux';

import { IconButton, Typography, Card, Checkbox, Grow } from "@mui/material";
import { RemoveCircle, RadioButtonUnchecked, CheckCircle } from "@mui/icons-material";
import { makeStyles, withStyles } from "@mui/styles";

import { selectIsDarkMode } from "../styleSlice.js";
import { removeTodo, updateTodoStatus } from "../todosThunks.js";

const useStyles = makeStyles({
  noSelect: {
    "-webkit-touch-callout": "none",
    " -webkit-user-select": "none",
    "-khtml-user-select": "none",
    "-moz-user-select": "none",
    "-ms-user-select": "none",
    "user-select": "none",
  }, todoItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: "1em",
    padding: ".5em .5em 0 .5em",
  },
  barred: { textDecoration: "line-through" },
  normal: { textDecoration: "none" },
  itemSize: {
    fontSize: "min(4.1vw,1.5em)",
    width: "84%",
  },

  check: {
    width: "11%",
    height: "8%",
    textAlign: "left",
  },
});

const TodoListItem = ({ todo, expandTasks }) => {
  const darkMode = useSelector(state => selectIsDarkMode(state));
  const classes = useStyles();
  const dispatch = useDispatch();
  const Checked = withStyles({
    root: {
      color: darkMode ? "#dbe6fd" : "#225254",
    },
  })(CheckCircle);
  return (
    <Grow in={expandTasks} style={{ transformOrigin: "top left" }}>
      <Card className={classes.todoItem}>
        <Checkbox
          color="primary"
          className={`${classes.check}`}
          checked={todo.isCompleted}
          onChange={() => dispatch(updateTodoStatus({ id: todo.id, isCompleted: !todo.isCompleted }))}
          icon={<RadioButtonUnchecked />}
          checkedIcon={<Checked />}
        />
        <Typography
          className={`${todo.isCompleted ? classes.barred : classes.normal} ${classes.itemSize
            } ${classes.noSelect}`}
        >
          {todo.content}
        </Typography>
        <IconButton
          className={classes.check}
          color="secondary"
          onClick={() => dispatch(removeTodo(todo.id))}
        >
          <RemoveCircle />
        </IconButton>
      </Card>
    </Grow>
  );
};

export default TodoListItem;

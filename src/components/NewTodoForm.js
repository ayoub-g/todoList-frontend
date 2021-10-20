import React, { useState } from "react";
import { useDispatch } from 'react-redux';

import { Button, TextField, IconButton, Box, useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Add, Close } from "@mui/icons-material";

import { createTodo } from "../todosThunks";
const useStyles = makeStyles({
  todoForm: {
    position: "fixed",
    padding: "1em",
    bottom: 0,
    background: 'white',

  },
  smForm: { width: 500 },
  xsForm: { width: "100%" },

  btnContainer: {
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  textField: { width: "100%", background: 'white' },
});

const NewTodoForm = ({ setShowAddTodoForm }) => {

  const matchesMedium = useMediaQuery("(min-width:768px)");

  const classes = useStyles();

  // flag to update render when the user clicks on  CreateTodo Button
  const [todoContent, setTodoContent] = useState("");
  const dispatch = useDispatch()
  const handleNewTodoChange = (e) => {
    setTodoContent(e.target.value);
  };

  return (
    <Box className={`${classes.todoForm}  ${matchesMedium ? classes.smForm : classes.xsForm}`}>
      <TextField
        className={classes.textField}
        type="text"
        multiline
        value={todoContent}
        rows={4}
        onChange={handleNewTodoChange}
        autoFocus
      />
      <Box className={`${classes.btnContainer}`}>
        <Button
          className={classes.btn}
          onClick={() => {
            if (todoContent.trim().length > 0) {
              dispatch(createTodo(todoContent));
              setTodoContent("");
            }
          }}
          startIcon={<Add />}
        >
          Ajouter Todo
        </Button>
        <IconButton
          onClick={() => setShowAddTodoForm(false)}
          aria-label="close"
        >
          <Close />
        </IconButton>
      </Box>
    </Box>
  );
};

export default NewTodoForm;

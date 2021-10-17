import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { Button, TextField, IconButton, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Add, Close } from "@mui/icons-material";

import { createTodo } from "../todosThunks";
import { selectIsDarkMode } from "../styleSlice";
const useStyles = makeStyles({
  todoForm: {
    position: "absolute",
    padding: "1em",
    bottom: 0,
    width: "100%",
    border: "solid 1px gray",
  },
  btnContainer: {
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  textField: { width: "100%" },
  textFieldDarkColor: { color: "white" },
  textFieldLightColor: { color: "black" },
});

const NewTodoForm = ({
  showAddTodoForm,
  setShowAddTodoForm }) => {
  const darkMode = useSelector(state => selectIsDarkMode(state));
  const classes = useStyles();

  // flag to update render when the user clicks on  CreateTodo Button
  const [todoContent, setTodoContent] = useState("");
  const dispatch = useDispatch()
  const handleNewTodoChange = (e) => {
    setTodoContent(e.target.value);
  };

  const textFieldColorClass = darkMode
    ? classes.textFieldDarkColor
    : classes.textFieldLightColor;
  const renderTextField = () => {
    return (
      <Box className={classes.todoForm}>
        <TextField
          className={classes.textField}
          type="text"
          multiline
          value={todoContent}
          rows={4}
          onChange={handleNewTodoChange}
          autoFocus
          InputProps={{ className: textFieldColorClass }}
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
  if (showAddTodoForm) {
    return renderTextField();
  }
};
export default NewTodoForm;

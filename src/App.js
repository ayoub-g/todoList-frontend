import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { AppBar, Toolbar, Box, Card, Button, IconButton, Switch, CssBaseline } from "@mui/material";
import { AddCircleRounded } from "@mui/icons-material";
import { makeStyles, withStyles, ThemeProvider } from "@mui/styles";

import { switchTheme, selectIsDarkMode } from "./styleSlice";
import { lightThemeColor, themeOrangeDark, themeOrangeLight } from "./themes";

import TodoList from "./components/TodoList";
import NewTodoForm from "./components/NewTodoForm";

const useStyles = makeStyles({
  main: { height: '100vh', width: '100vw', position: 'relative' },
  box: { background: lightThemeColor },
  content: { marginTop: "45px", paddingTop: "15px" },
  contentBackground: { background: lightThemeColor },
  tasksLabel: { fontSize: "2.1em" },
  items: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    textAlign: "right",
    justifyContent: "space-between",
    width: "100%",
  },
  switch: { display: "flex", flexDirection: "row", alignItems: "center" },
  appBarFlat: { boxShadow: "none" },

  addTaskButton: {
    position: "fixed !important",
    bottom: "1vh",
    right: "1vw",
    zIndex: 999,
  },
});
const AddTaskIcon = withStyles({
  root: {
    fontSize: "min(14vw, 3.5em)",
  },
})(AddCircleRounded);
const App = () => {

  const [showAddTodoForm, setShowAddTodoForm] = useState(false);
  const darkMode = useSelector(state => selectIsDarkMode(state));
  const dispatch = useDispatch();

  const classes = useStyles();

  useEffect(() => {
    /* set theme color to the body if we're using the light theme */
    document.body.style = darkMode
      ? (document.body.style = `background:'none';`)
      : `background: ${lightThemeColor};`;
  });
  const renderAddTodoForm = (
    <Card>
      <NewTodoForm
        showAddTodoForm={showAddTodoForm}
        setShowAddTodoForm={setShowAddTodoForm}
      />
    </Card>
  );

  return (
    <ThemeProvider theme={darkMode ? themeOrangeDark : themeOrangeLight}>
      <CssBaseline />
      {
        /* hides Add button when todoform is displayed */
        showAddTodoForm ? null : (
          <IconButton
            className={classes.addTaskButton}
            onClick={() => setShowAddTodoForm(true)}
          >
            <AddTaskIcon />
          </IconButton>
        )
      }
      <Box>
        <AppBar position="fixed" className={classes.appBarFlat}>
          <Toolbar>
            <Box className={classes.items}>
              <Box fontWeight="fontWeightBold" className={classes.tasksLabel}>
                Tasks
              </Box>
              <Box className={classes.switch} fontWeight="fontWeightBold">
                <Box fontWeight="fontWeightBold">Dark Mode</Box>
                <Switch
                  color="default"
                  checked={darkMode}
                  onChange={(event) => dispatch(switchTheme(event.target.checked))}
                />
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
        <Box
          className={`${classes.content} ${darkMode ? null : classes.contentBackground
            }`}
        >
          <TodoList />
        </Box>
        {showAddTodoForm ? renderAddTodoForm : null}
      </Box>
    </ThemeProvider >
  );
};

export default App;

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AppBar, Toolbar, Box, Card, IconButton, CssBaseline } from "@mui/material";
import { AddCircleRounded } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";

import TodoList from "./components/TodoList";
import NewTodoForm from "./components/NewTodoForm";
import { selectLoadingError } from "./todosSlice";

const useStyles = makeStyles({
  mainFlex: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center'
  },
  main: {
    height: '100vh',
    width: '100vw'
  },
  content: { marginTop: "45px", paddingTop: "15px" },
  tasksLabel: { fontSize: "2.1em" },

  items: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    textAlign: "right",
    justifyContent: "space-between",
    width: "100%",
  },
  newTodoFormCard: { display: 'flex', flexDirection: 'row', justifyContent: 'center' },

  appBarFlat: { boxShadow: "none" },

  addTaskButton: {
    position: "fixed !important",
    bottom: "1vh",
    right: "1vw",
    zIndex: 999,
  }, error: {
    textAlign: 'center', fontWeight: 'bold'
  }
});
const useStylesIcon = makeStyles({
  root: {
    color: 'blue', fontSize: '2em !important'
  },
});
const App = () => {

  const [showAddTodoForm, setShowAddTodoForm] = useState(false);
  const iconClasses = useStylesIcon();
  const classes = useStyles();
  const loadingError = useSelector(state => selectLoadingError(state))
  const renderLoadingError = <Box className={classes.error}> Error while loading Todos</Box>
  const renderAddTodoForm = (
    <Card className={classes.newTodoFormCard}>
      <NewTodoForm
        showAddTodoForm={showAddTodoForm}
        setShowAddTodoForm={setShowAddTodoForm}
      />
    </Card >
  );

  return (<React.Fragment>
    <CssBaseline />

    <Box className={loadingError ? classes.mainFlex : classes.main}>
      <Box className={classes.content}>
        {loadingError ? renderLoadingError : <TodoList />}
      </Box>
      {
        showAddTodoForm ? null : (
          <IconButton
            className={classes.addTaskButton}
            onClick={() => setShowAddTodoForm(true)}
          >
            <AddCircleRounded className={iconClasses.root} />
          </IconButton>
        )
      }
      <AppBar position="fixed" className={classes.appBarFlat}>
        <Toolbar>
          <Box className={classes.items}>
            <Box fontWeight="fontWeightBold" className={classes.tasksLabel}>
              Tasks
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {showAddTodoForm ? renderAddTodoForm : null}
    </Box>
  </React.Fragment>
  );
};

export default App;

import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Header from '../header';
import {ConverterPage, RatePage} from '../pages';
import {
  createMuiTheme,
  CssBaseline,
  ThemeProvider,
  Container,
  makeStyles,
} from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

const useStyles = makeStyles((theme) => ({
  main: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  }
}));

const App = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header/>
      <main className={classes.main}>
        <Container maxWidth="lg">
          <Switch>
            <Route path="/" component={ConverterPage} exact />
            <Route path="/rate" component={RatePage} />
          </Switch>
        </Container>
      </main>
    </ThemeProvider>
  )
}

export default App;
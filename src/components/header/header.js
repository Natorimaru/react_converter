import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {AppBar, Toolbar, Button, makeStyles, Container} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    padding: 0
  },
  button: {
    marginRight: theme.spacing(1)
  }
}));

const Header = () => {
  const classes = useStyles();
  return (
    <header>
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar className={classes.toolbar}>
            <Button variant="outlined"
                    component={RouterLink}
                    to="/"
                    className={classes.button}
            >Converter</Button>
            <Button variant="outlined"
                    component={RouterLink}
                    to="/rate"
                    className={classes.button}
            >Rate</Button>
          </Toolbar>
        </Container>
      </AppBar>
    </header>
  )
}

export default Header;
import React from 'react';
import {makeStyles, Typography} from '@material-ui/core';
import ConverterWidget from '../converter-widget';

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(2)
  }
}));

const ConverterPage = () => {
  const classes = useStyles();
  return (
    <div>
      <Typography variant="h4" className={classes.title}>Currency conversion</Typography>
      <ConverterWidget />
    </div>
  )
}

export default ConverterPage;
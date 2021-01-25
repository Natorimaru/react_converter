import React from 'react';
import {makeStyles, Typography} from '@material-ui/core';
import RateTable from '../rate-table';

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(2)
  }
}));

function createData(name, rate, favorites) {
  return {name, rate, favorites};
}

const rows = [
  createData('RUB', 159, false),
  createData('EUR', 237, true),
  createData('KGS', 262, false),
];

const RatePage = () => {
  const classes = useStyles();
  return (
    <div>
      <Typography variant="h4" className={classes.title}>Current dollar rate</Typography>
      <RateTable rows={rows} />
    </div>
  )
}

export default RatePage;
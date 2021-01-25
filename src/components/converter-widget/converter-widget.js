import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  makeStyles,
  Grid,
  TextField,
  MenuItem,
  Button, LinearProgress, Typography,
} from '@material-ui/core';
import {fetchConvertCurrency} from '../../actions';
import {compose} from '../../utils';
import {withOpenratesService} from '../hoc';
import {connect} from 'react-redux';

const useStyles = makeStyles((theme) => ({
  input: {
    height: 40
  },
  button: {
    height: 40
  },
  selectRoot: {
    height: 40,
    display: "flex",
    alignItems: "center"
  },
  select: {
    height: 40,
    paddingTop: 0,
    paddingBottom: 0,
  },
  result: {
    marginTop: theme.spacing(4)
  }
}));

const validationSchema = yup.object({
  fieldCurrencyAmount: yup
    .string('Field is required')
    .required('Field is required'),
  fieldCurrencyFrom: yup
    .string('Field is required')
    .required('Field is required'),
  fieldCurrencyTo: yup
    .string('Field is required')
    .required('Field is required'),
});

const ConverterWidget = ({baseCurrency, currencyAmount, currencyFrom, currencyTo, currencyResult, loading, error, fetchConvertCurrency}) => {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      fieldCurrencyAmount: currencyAmount,
      fieldCurrencyFrom: currencyFrom,
      fieldCurrencyTo: currencyTo
    },
    validationSchema: validationSchema,
    onSubmit: ({fieldCurrencyAmount, fieldCurrencyFrom, fieldCurrencyTo}) => {
      fetchConvertCurrency(fieldCurrencyAmount, fieldCurrencyFrom, fieldCurrencyTo);
    },
  });

  if (loading) {
    return <LinearProgress color="secondary" />;
  }

  if (error) {}

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={4}>
          <Grid item xs>
            <TextField
              id="fieldCurrencyAmount"
              name="fieldCurrencyAmount"
              label="Amount"
              variant="outlined"
              fullWidth
              size="small"
              type="number"
              InputProps={{className: classes.input}}
              value={formik.values.fieldCurrencyAmount}
              onChange={formik.handleChange}
              error={formik.touched.fieldCurrencyAmount && Boolean(formik.errors.fieldCurrencyAmount)}
              helperText={formik.touched.fieldCurrencyAmount && formik.errors.fieldCurrencyAmount}/>
          </Grid>
          <Grid item xs>
            <TextField
              id="fieldCurrencyFrom"
              name="fieldCurrencyFrom"
              label="From"
              select
              fullWidth
              variant="outlined"
              size="small"
              SelectProps={{
                classes: {
                  root: classes.selectRoot,
                  select: classes.select
                }
              }}
              value={formik.values.fieldCurrencyFrom}
              onChange={formik.handleChange}
              error={formik.touched.fieldCurrencyFrom && Boolean(formik.errors.fieldCurrencyFrom)}
              helperText={formik.touched.fieldCurrencyFrom && formik.errors.fieldCurrencyFrom}>
              <MenuItem value="" disabled>From</MenuItem>
              {baseCurrency.map((item) => {
                return <MenuItem key={`from-${item}`} value={item}>{item}</MenuItem>
              })}
            </TextField>
          </Grid>
          <Grid item xs>
            <TextField
              id="fieldCurrencyTo"
              name="fieldCurrencyTo"
              label="To"
              select
              fullWidth
              variant="outlined"
              size="small"
              SelectProps={{
                classes: {
                  root: classes.selectRoot,
                  select: classes.select
                }
              }}
              value={formik.values.fieldCurrencyTo}
              onChange={formik.handleChange}
              error={formik.touched.fieldCurrencyTo && Boolean(formik.errors.fieldCurrencyTo)}
              helperText={formik.touched.fieldCurrencyTo && formik.errors.fieldCurrencyTo}>
              <MenuItem value="" disabled>To</MenuItem>
              {baseCurrency.map((item) => {
                return <MenuItem key={`to-${item}`} value={item}>{item}</MenuItem>
              })}
            </TextField>
          </Grid>
          <Grid item xs>
            <Button
              variant="outlined"
              fullWidth
              className={classes.button}
              type="submit">Submit</Button>
          </Grid>
        </Grid>
      </form>
      {currencyResult && <Typography className={classes.result} variant="subtitle1">{currencyResult}</Typography>}
    </div>
  )
}

const mapStateToProps = ({converterWidget: {baseCurrency, currencyAmount, currencyFrom, currencyTo, currencyResult, loading, error}}) => {
  return {baseCurrency, currencyAmount, currencyFrom, currencyTo, currencyResult, loading, error};
}

const mapDispatchToProps = (dispatch, {openratesService}) => {
  return {
    fetchConvertCurrency: (currencyAmount, currencyFrom, currencyTo) => {
      return fetchConvertCurrency(openratesService, dispatch)(currencyAmount, currencyFrom, currencyTo)
    }
  }
}

export default compose(
  withOpenratesService(),
  connect(mapStateToProps, mapDispatchToProps)
)(ConverterWidget);
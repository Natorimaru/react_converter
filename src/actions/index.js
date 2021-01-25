const ratesRequested = () => {
  return {
    type: 'FETCH_RATES_REQUEST'
  }
}
const ratesLoaded = (newRates) => {
  return {
    type: 'FETCH_RATES_SUCCESS',
    payload: newRates
  }
}
const ratesError = (error) => {
  return {
    type: 'FETCH_RATES_FAILURE',
    payload: error
  }
}
const fetchRates = (openratesService, dispatch) => () => {
  dispatch(ratesRequested());
  openratesService.getRates()
    .then((data) => {
      let arr = [];
      Object.keys(data.rates).map(rate => arr.push({
        name: rate,
        value: data.rates[rate].toFixed(4),
        favorites: false
      }));
      return dispatch(ratesLoaded(arr));
    })
    .catch((error) => dispatch(ratesError(error)));
};

const rateAddedToFavorites = (name, favorites) => {
  return {
    type: 'RATE_ADDED_TO_FAVORITES',
    payload: {name, favorites}
  }
}

const convertCurrencyRequested = () => {
  return {
    type: 'CONVERT_CURRENCY_REQUEST'
  }
}
const convertCurrencyLoaded = (payload) => {
  return {
    type: 'CONVERT_CURRENCY_SUCCESS',
    payload
  }
}
const convertCurrencyError = (error) => {
  return {
    type: 'CONVERT_CURRENCY_FAILURE',
    payload: error
  }
}
const fetchConvertCurrency = (openratesService, dispatch) => (currencyAmount, currencyFrom, currencyTo) => {
  dispatch(convertCurrencyRequested());
  openratesService.getConvertCurrency(currencyFrom, currencyTo)
    .then((data) => {
      const extRate = currencyAmount * data.rates[currencyTo];
      const result = `${currencyAmount} ${currencyFrom} = ${extRate.toFixed(4)} ${currencyTo}`;

      dispatch(convertCurrencyLoaded({
        currencyAmount,
        currencyFrom,
        currencyTo,
        currencyResult: result
      }))
    })
    .catch((error) => dispatch(convertCurrencyError(error)));
};

export {
  fetchRates,
  fetchConvertCurrency,
  rateAddedToFavorites
}
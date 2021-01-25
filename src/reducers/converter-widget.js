const updateConverterWidget = (state, action) => {
  if (state === undefined) {
    return {
      baseCurrency: ['AUD', 'BGN', 'BRL', 'CAD', 'CHF', 'CNY', 'CZK', 'DKK', 'EUR', 'GBP', 'HKD', 'HRK', 'HUF', 'IDR', 'ILS', 'INR', 'ISK', 'JPY', 'KRW', 'MXN', 'MYR', 'NOK', 'NZD', 'PHP', 'PLN', 'RON', 'RUB', 'SEK', 'SGD', 'THB', 'TRY', 'USD', 'ZAR'],
      currencyAmount: 1,
      currencyFrom: '',
      currencyTo: '',
      currencyResult: null,
      loading: false,
      error: null
    }
  }
  switch (action.type) {
    case 'CONVERT_CURRENCY_REQUEST':
      return {
        ...state.converterWidget,
        currencyResult: null,
        loading: true,
        error: null
      };
    case 'CONVERT_CURRENCY_SUCCESS':
      const {currencyAmount, currencyFrom, currencyTo, currencyResult} = action.payload;
      return {
        ...state.converterWidget,
        currencyAmount,
        currencyFrom,
        currencyTo,
        currencyResult,
        loading: false,
        error: null
      };
    case 'CONVERT_CURRENCY_FAILURE':
      return {
        ...state.converterWidget,
        currencyResult: null,
        loading: false,
        error: action.payload
      };
    default:
      return state.converterWidget;
  }
}

export default updateConverterWidget;
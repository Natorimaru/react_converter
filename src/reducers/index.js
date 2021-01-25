import updateRateTable from './rate-table';
import updateConverterWidget from './converter-widget';

const reducer = (state, action) => {
  return {
    rateTable: updateRateTable(state, action),
    converterWidget: updateConverterWidget(state, action)
  }
}

export default reducer;
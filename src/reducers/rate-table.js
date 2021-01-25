const updateRateFavoritesItem = (rate, newFavorites) => {
  const {name, value} = rate;
  return {
    name,
    value,
    favorites: newFavorites
  };
}
const updateRateFavoritesItems = (rateItems, item, idx, favorites) => {
  if (favorites) {
    return [
      item,
      ...rateItems.slice(0, idx),
      ...rateItems.slice(idx + 1)
    ]
  } else {
    return [
      ...rateItems.slice(0, idx),
      ...rateItems.slice(idx + 1),
      item,
    ]
  }
}
const updateRateFavorites = (state, {name, favorites}) => {
  const {rateTable: {rates}} = state;
  const rate = rates.find((i) => i.name === name);
  const rateIdx = rates.findIndex((i) => i.name === name);
  const updatedRate = updateRateFavoritesItem(rate, favorites);

  return {
    ...state.rateTable,
    rates: updateRateFavoritesItems(state.rateTable.rates, updatedRate, rateIdx, favorites),
  };
}
const updateRateTable = (state, action) => {
  if (state === undefined) {
    return {
      rates: [],
      loading: true,
      error: null
    }
  }
  switch (action.type) {
    case 'FETCH_RATES_REQUEST':
      return {
        rates: [],
        loading: true,
        error: null
      };
    case 'FETCH_RATES_SUCCESS':
      return {
        rates: action.payload,
        loading: false,
        error: null
      };
    case 'FETCH_RATES_FAILURE':
      return {
        rates: [],
        loading: false,
        error: action.payload
      };
    case 'RATE_ADDED_TO_FAVORITES':
      return updateRateFavorites(state, action.payload);
    default:
      return state.rateTable;
  }
}

export default updateRateTable;
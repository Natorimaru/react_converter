export default class OpenratesService {

  _openrates_api = 'https://api.exchangeratesapi.io/latest';

  getRates = async () => {
    const data = await fetch(`${this._openrates_api}?base=USD`);
    return await data.json();
  }
  getConvertCurrency = async (currencyFrom, currencyTo) => {
    const data = await fetch(`${this._openrates_api}?base=${currencyFrom}&symbols=${currencyTo}`);
    return await data.json();
  }
}
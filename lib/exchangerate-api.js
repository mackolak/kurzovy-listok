const axios = require('axios');
const config = require('config');
const { GetCurrencyFromExternalSource } = require('./errors');

const exchangeRateURL = config.get('exchangeRate.url');
const exchangeRateApiKey = config.get('exchangeRate.apiKey');

class ExchangeRateAPI {
  static async getCurrencyRatesForCodeAndDate(currencyCode, currencyDate) {
    try {
      const { year, month, day } = currencyDate;
      const url = `${exchangeRateURL}${currencyCode}/${year}/${month}/${day}`;
      const headers = {
        headers: { Authorization: `Bearer ${exchangeRateApiKey}` },
      };
      const { data } = await axios.get(url, headers);
      return data;
    } catch (error) {
      throw new GetCurrencyFromExternalSource(
        'Getting currency from external api service failed',
        error
      );
    }
  }
}

module.exports = ExchangeRateAPI;

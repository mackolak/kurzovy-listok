const config = require('config');
const axios = require('axios');

const exchangeRateURL = config.get('exchangeRate.url');
const exchangeRateApiKey = config.get('exchangeRate.apiKey');

class CurrencyRates {
  constructor() {
    this.currencyRates = {};
  }
  setCurrencyRates({ data }) {
    const { base_code: baseCode, conversion_rates: conversionRates } = data;
    this.currencyRates[baseCode] = conversionRates;
  }

  isCurrencyCodeAvailable(baseCode) {
    return this.currencyRates[baseCode];
  }

  async getRelatedRatestoBaseCurrencyCode(currencyCode) {
    try {
      const url = `${exchangeRateURL}${currencyCode}`;
      const headers = {
        headers: { Authorization: `Bearer ${exchangeRateApiKey}` },
      };
      const result = await axios.get(url, headers);
      this.setCurrencyRates(result);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CurrencyRates;

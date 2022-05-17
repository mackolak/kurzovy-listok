const currencyRatesCache = require('./currency-list-service');
const ExchangeRateAPI = require('../../lib/exchangerate-api');

class KurzovyListokService {
  static async getCurrenciesAndConvert(
    amount,
    currencyCodeBase,
    currencyRateDate
  ) {
    try {
      if (!currencyRatesCache.isCurrencyCodeAvailable(currencyCodeBase)) {
        currencyRatesCache.addNewCurrencyCode(currencyCodeBase);
      }
      let currencyRatesWithSpecificDate =
        currencyRatesCache.getCurrencyRatesForExistingCurrencyCodeAndDate(
          currencyRateDate,
          currencyCodeBase
        );
      if (!currencyRatesWithSpecificDate) {
        const currencyRates =
          await ExchangeRateAPI.getCurrencyRatesForCodeAndDate(
            currencyCodeBase,
            currencyRateDate
          );
        currencyRatesWithSpecificDate =
          currencyRatesCache.addNewCurrencyRatesToExistingCurrencyCode(
            currencyRates,
            currencyRateDate
          );
      }
      return this.convertAmountToAllCurrencies(
        currencyRatesWithSpecificDate,
        amount,
        currencyCodeBase
      );
    } catch (error) {
      throw error;
    }
  }

  static convertAmountToAllCurrencies(currencyData, amount, currencyCodeBase) {
    const kurzovyListok = {};
    for (const [currencyCode, currencyRate] of Object.entries(
      currencyData.currencyRates
    )) {
      const convertedAmount = currencyRate * amount;
      kurzovyListok[
        currencyCode
      ] = `Zkonvertovana suma pre menu ${currencyCode} je ${convertedAmount} s kurzom ${currencyRate} zo zakladnej meny: ${currencyCodeBase}`;
    }
    return kurzovyListok;
  }
}

module.exports = KurzovyListokService;

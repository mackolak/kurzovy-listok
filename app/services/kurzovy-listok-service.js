const currencyRates = require('./currency-rate-service');

class KurzovyListokService {
  static async getCurrenciesAndConvert(amount, currencyCodeBase) {
    try {
      if (!currencyRates.isCurrencyCodeAvailable(currencyCodeBase)) {
        await currencyRates.getRelatedRatestoBaseCurrencyCode(currencyCodeBase);
      }
      return this.convertAmountToAllCurrencies(
        currencyRates,
        amount,
        currencyCodeBase
      );
    } catch (error) {
      throw error;
    }
  }

  static convertAmountToAllCurrencies(currencyRates, amount, currencyCodeBase) {
    const kurzovyListok = {};
    for (const [currencyCode, currencyRate] of Object.entries(
      currencyRates.currencyRates[currencyCodeBase]
    )) {
      const convertedAmount = currencyRate * amount;
      kurzovyListok[
        currencyCode
      ] = `Converted amount for currency code ${currencyCode} is ${convertedAmount} with rate ${currencyRate}`;
    }
    return kurzovyListok;
  }
}

module.exports = KurzovyListokService;

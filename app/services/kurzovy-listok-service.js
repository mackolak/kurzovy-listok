const currencyData = require('./currency-data-service');

class KurzovyListokService {
  static async getCurrenciesAndConvert(amount, currencyCodeBase) {
    try {
      if (!currencyData.isCurrencyCodeAvailable(currencyCodeBase)) {
        await currencyData.getRelatedRatestoBaseCurrencyCode(currencyCodeBase);
      }
      return this.convertAmountToAllCurrencies(
        currencyData,
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
      currencyData.currencyRates[currencyCodeBase]
    )) {
      const convertedAmount = currencyRate * amount;
      kurzovyListok[
        currencyCode
      ] = `Zkonvertovana suma pre menu ${currencyCode} je ${convertedAmount} s kurzom ${currencyRate}`;
    }
    return kurzovyListok;
  }
}

module.exports = KurzovyListokService;

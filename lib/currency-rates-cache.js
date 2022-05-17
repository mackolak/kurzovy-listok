const BinarySearchTree = require('./currency-data-binary-search-tree');

class CurrencyRatesCache {
  constructor() {
    this.currencyRatesCache = {};
  }

  addNewCurrencyCode(currencyCode) {
    const binarySearchTree = new BinarySearchTree();
    this.currencyRatesCache[currencyCode] = binarySearchTree;
  }

  isCurrencyCodeAvailable(currencyCode) {
    return this.currencyRatesCache[currencyCode];
  }

  getCurrencyRatesForExistingCurrencyCodeAndDate(
    currencyRateDate,
    currencyCodeBase
  ) {
    return this.currencyRatesCache[currencyCodeBase].searchForCurrencyDate(
      currencyRateDate
    );
  }

  addNewCurrencyRatesToExistingCurrencyCode(currencyRates, currencyDate) {
    const { base_code: baseCode, conversion_rates: conversionRates } =
      currencyRates;
    return this.currencyRatesCache[baseCode].insert(
      currencyDate.unixDate,
      conversionRates
    );
  }
}

module.exports = CurrencyRatesCache;

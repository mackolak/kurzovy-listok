const KurzovyListokService = require('../services/kurzovy-listok-service');
const formatCurrencyDate = require('../helpers/formatDate');
const { BadRequestError } = require('../../lib/errors');

class KurzovyListokController {
  static async index(req, res, next) {
    try {
      const {
        suma: amount,
        kodMeny: currencyCode,
        datumKonverznehoListka: currencyRateDate,
      } = req.body;
      if (!amount || !currencyCode || !currencyRateDate) {
        throw new BadRequestError(
          'Suma alebo kod meny alebo datum konverzneho listka je nespravny'
        );
      }
      const kurzovyListok = await KurzovyListokService.getCurrenciesAndConvert(
        amount,
        currencyCode,
        formatCurrencyDate(currencyRateDate)
      );
      res.status(200).send(kurzovyListok);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = KurzovyListokController;

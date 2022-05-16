const KurzovyListokService = require('../services/kurzovy-listok-service');
const { BadRequestError } = require('../../lib/errors');

class KurzovyListokController {
  static async index(req, res, next) {
    try {
      const { suma: amount, kodMeny: currencyCode } = req.body;
      if (!amount || !currencyCode) {
        throw new BadRequestError('Suma alebo kod meny je nespravny');
      }
      const kurzovyListok = await KurzovyListokService.getCurrenciesAndConvert(
        amount,
        currencyCode
      );
      res.status(200).send(kurzovyListok);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = KurzovyListokController;

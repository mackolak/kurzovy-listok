const KurzovyListokService = require('../services/kurzovy-listok-service');
const { BadRequestError } = require('../../lib/errors');

class KurzovyListokController {
  static async index(req, res, next) {
    try {
      const { amount, currencyCode } = req.body;
      if (!amount || !currencyCode) {
        throw new BadRequestError('Invalid amount or currency');
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

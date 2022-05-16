const { app, appRoot, expect, request, sandbox } = require('./testHelper');
const axios = require('axios');
const currencyData = require(`${appRoot}/app/services/currency-data-service`);

describe('Kurzovy Listok', () => {
  describe('GET - /kurzovy-listok', () => {
    beforeEach(() => {
      currencyData.currencyRates = {};
    });

    afterEach(sandbox.restore);

    context('when data is valid', () => {
      it('responds with 200 OK and list of converted amounts', async () => {
        sandbox.stub(axios, 'get').resolves({
          data: {
            base_code: 'USD',
            conversion_rates: {
              EUR: 0.9013,
              USD: 1,
            },
          },
        });

        const { text } = await request(app)
          .post('/kurzovy-listok')
          .send({ kodMeny: 'USD', suma: 1000 })
          .expect(200);

        expect(text).to.eq(
          '{"EUR":"Zkonvertovana suma pre menu EUR je 901.3 s kurzom 0.9013","USD":"Zkonvertovana suma pre menu USD je 1000 s kurzom 1"}'
        );
      });
    });

    context('when data is invalid', () => {
      it('responds with 400 Bad Request Error when no currency code is provided', async () => {
        const { text } = await request(app)
          .post('/kurzovy-listok')
          .send({ suma: 1000 })
          .expect(400);

        expect(text).to.eq('Suma alebo kod meny je nespravny');
      });

      it('responds with 400 Bad Request Error when no currency code is provided', async () => {
        const { text } = await request(app)
          .post('/kurzovy-listok')
          .send({ kodMeny: 'EUR' })
          .expect(400);

        expect(text).to.eq('Suma alebo kod meny je nespravny');
      });
    });

    context('when external exchange rate service is not working', () => {
      it('throws custom GetCurrencyFromExternalSource error', async () => {
        sandbox.stub(axios, 'get').throws(new Error('Unrecoverable error'));

        const { text } = await request(app)
          .post('/kurzovy-listok')
          .send({ kodMeny: 'USD', suma: 1000 })
          .expect(500);

        expect(text).to.eq('Getting currency from external api service failed');
      });
    });
  });
});

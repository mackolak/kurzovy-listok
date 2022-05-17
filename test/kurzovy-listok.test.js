const { app, appRoot, expect, request, sandbox } = require('./testHelper');
const axios = require('axios');
const currencyRatesCache = require(`${appRoot}/app/services/currency-list-service`);

describe('Kurzovy Listok', () => {
  describe('GET - /kurzovy-listok', () => {
    beforeEach(() => {
      currencyRatesCache.currencyRatesCache = {};
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

        await request(app)
          .post('/kurzovy-listok')
          .send({
            kodMeny: 'USD',
            suma: 1000,
            datumKonverznehoListka: '2018-05-01',
          })
          .expect(200, {
            EUR: 'Zkonvertovana suma pre menu EUR je 901.3 s kurzom 0.9013 zo zakladnej meny: USD',
            USD: 'Zkonvertovana suma pre menu USD je 1000 s kurzom 1 zo zakladnej meny: USD',
          });
      });

      it('caches exchange rates for different dates and same currency code and uses them in future calls for the same conversion date', async () => {
        const axiosStub = sandbox.stub(axios, 'get');

        axiosStub.onCall(0).resolves({
          data: {
            base_code: 'USD',
            conversion_rates: {
              EUR: 0.9013,
              USD: 1,
            },
          },
        });

        axiosStub.onCall(1).resolves({
          data: {
            base_code: 'USD',
            conversion_rates: {
              EUR: 0.592,
              USD: 1,
            },
          },
        });

        axiosStub.onCall(2).resolves({
          data: {
            base_code: 'USD',
            conversion_rates: {
              EUR: 0.278,
              USD: 1,
            },
          },
        });

        await Promise.all([
          request(app)
            .post('/kurzovy-listok')
            .send({
              kodMeny: 'USD',
              suma: 1000,
              datumKonverznehoListka: '2018-05-01',
            })
            .expect(200),
          request(app)
            .post('/kurzovy-listok')
            .send({
              kodMeny: 'USD',
              suma: 1000,
              datumKonverznehoListka: '2020-01-01',
            })
            .expect(200),
          request(app)
            .post('/kurzovy-listok')
            .send({
              kodMeny: 'USD',
              suma: 1000,
              datumKonverznehoListka: '2017-04-15',
            })
            .expect(200),
        ]);

        await request(app)
          .post('/kurzovy-listok')
          .send({
            kodMeny: 'USD',
            suma: 1555,
            datumKonverznehoListka: '2020-01-01',
          })
          .expect(200, {
            EUR: 'Zkonvertovana suma pre menu EUR je 920.56 s kurzom 0.592 zo zakladnej meny: USD',
            USD: 'Zkonvertovana suma pre menu USD je 1555 s kurzom 1 zo zakladnej meny: USD',
          });

        expect(axiosStub.callCount).to.eq(3);
      });

      it('caches exchange rates for different currencies and uses them in future calls', async () => {
        const axiosStub = sandbox.stub(axios, 'get');

        axiosStub.onCall(0).resolves({
          data: {
            base_code: 'USD',
            conversion_rates: {
              EUR: 0.9013,
              USD: 1,
            },
          },
        });

        axiosStub.onCall(1).resolves({
          data: {
            base_code: 'EUR',
            conversion_rates: {
              EUR: 1,
              USD: 0.78,
            },
          },
        });

        axiosStub.onCall(2).resolves({
          data: {
            base_code: 'CAD',
            conversion_rates: {
              EUR: 1.598,
              USD: 0.99,
            },
          },
        });

        await Promise.all([
          request(app)
            .post('/kurzovy-listok')
            .send({
              kodMeny: 'USD',
              suma: 1000,
              datumKonverznehoListka: '2018-05-01',
            })
            .expect(200),
          request(app)
            .post('/kurzovy-listok')
            .send({
              kodMeny: 'EUR',
              suma: 1000,
              datumKonverznehoListka: '2020-01-01',
            })
            .expect(200),
          request(app)
            .post('/kurzovy-listok')
            .send({
              kodMeny: 'CAD',
              suma: 1000,
              datumKonverznehoListka: '2017-04-15',
            })
            .expect(200),
        ]);

        await request(app)
          .post('/kurzovy-listok')
          .send({
            kodMeny: 'EUR',
            suma: 1555,
            datumKonverznehoListka: '2020-01-01',
          })
          .expect(200, {
            EUR: 'Zkonvertovana suma pre menu EUR je 1555 s kurzom 1 zo zakladnej meny: EUR',
            USD: 'Zkonvertovana suma pre menu USD je 1212.9 s kurzom 0.78 zo zakladnej meny: EUR',
          });

        expect(axiosStub.callCount).to.eq(3);
      });
    });

    context('when data is invalid', () => {
      it('responds with 400 Bad Request Error when no currency code is provided', async () => {
        const { text } = await request(app)
          .post('/kurzovy-listok')
          .send({ suma: 1000, datumKonverznehoListka: '2018-05-01' })
          .expect(400);

        expect(text).to.eq(
          'Suma alebo kod meny alebo datum konverzneho listka je nespravny'
        );
      });

      it('responds with 400 Bad Request Error when no currency code is provided', async () => {
        const { text } = await request(app)
          .post('/kurzovy-listok')
          .send({ kodMeny: 'EUR', datumKonverznehoListka: '2018-05-01' })
          .expect(400);

        expect(text).to.eq(
          'Suma alebo kod meny alebo datum konverzneho listka je nespravny'
        );
      });

      it('responds with 400 Bad Request Error when no date for conversion rates is provided', async () => {
        const { text } = await request(app)
          .post('/kurzovy-listok')
          .send({ suma: 1000, kodMeny: 'EUR' })
          .expect(400);

        expect(text).to.eq(
          'Suma alebo kod meny alebo datum konverzneho listka je nespravny'
        );
      });
    });

    context('when external exchange rate service is not working', () => {
      it('throws custom GetCurrencyFromExternalSource error', async () => {
        sandbox.stub(axios, 'get').throws(new Error('Unrecoverable error'));

        const { text } = await request(app)
          .post('/kurzovy-listok')
          .send({
            kodMeny: 'USD',
            suma: 1000,
            datumKonverznehoListka: '2018-05-01',
          })
          .expect(500);

        expect(text).to.eq('Getting currency from external api service failed');
      });
    });
  });
});

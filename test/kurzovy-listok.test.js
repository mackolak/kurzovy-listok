const { app, expect, request, sandbox } = require('./testHelper');
const axios = require('axios');

describe('Kurzovy Listok', () => {
  describe('GET - /kurzovy-listok', () => {
    beforeEach(sandbox.restore);

    context('when data is valid', () => {
      it('responds with 200 OK and list of converted amounts', async () => {
        const axiosStub = sandbox.stub(axios, 'get').resolves({
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
          .send({ currencyCode: 'USD', amount: 1000 })
          .expect(200);

        expect(text).to.eq(
          '{"EUR":"Converted amount for currency code EUR is 901.3 with rate 0.9013","USD":"Converted amount for currency code USD is 1000 with rate 1"}'
        );
      });
    });

    context('when data is invalid', () => {
      it('responds with 400 Bad Request Error when no currency code is provided', async () => {
        const { text } = await request(app)
          .post('/kurzovy-listok')
          .send({ amount: 1000 })
          .expect(400);

        expect(text).to.eq('Invalid amount or currency');
      });

      it('responds with 400 Bad Request Error when no currency code is provided', async () => {
        const { text } = await request(app)
          .post('/kurzovy-listok')
          .send({ currencyCode: 'EUR' })
          .expect(400);

        expect(text).to.eq('Invalid amount or currency');
      });
    });
  });
});

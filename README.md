# kurzovy-listok

## POST {server}/kurzovy-listok

API generuje zoznam dostupnych mien s ich kurzami a prepocitanou sumou na ne, ktora bola zadana pri volani tohto API

### Input

JSON body s povinnymi parametrami amount a currencyCode
Priklad:

> {<br>
> "suma": 160,<br>
> "kodMeny": "USD"<br>
> }

### Output

Priklad ako vyzera odpoved:

> {<br>
> "USD": "Zkonvertovana suma pre menu USD je 160 s kurzom 1",<br>
> "AED": "Zkonvertovana suma pre menu AED je 587.6 s kurzom 3.6725",<br>
> "AFN": "Zkonvertovana suma pre menu AFN je 14019.952000000001 s kurzom 87.6247",<br>
> "ALL": "Zkonvertovana suma pre menu ALL je 18298.016 s kurzom 114.3626",<br>
> "AMD": "Zkonvertovana suma pre menu AMD je 73043.96800000001 s kurzom 456.5248",<br>
> "ANG": "Zkonvertovana suma pre menu ANG je 286.4 s kurzom 1.79",<br>
> .... atd...<br>
> }

### Env variables

Aby sa API vedelo connectnut na externy service odkial berie kurzy k jednotlivym menam - https://www.exchangerate-api.com/docs/authentication, potrebuje mat zadefinovane v env variables url a api key, napriklad(hodnoty musia byt nahradene realnymi hodnotami):

> EXCHANGE_RATE_API_KEY='https://exchange-rate.url.example'<br>
> EXCHANGE_RATE_URL='somesecretapikey'

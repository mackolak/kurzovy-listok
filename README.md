# kurzovy-listok

## POST {server}/kurzovy-listok

Toto proxy API vygeneruje zoznam sum v inych menach aj s ich kurzami, prepocitanych na zaklade sumy, zakladnej meny a datumu konverzneho listka zadanych pri volani tohto API.

- Na nastartovanie celej aplikacie si najprv treba nainstalovat npm packages z prikazom **npm ci**
- Setupnut .env subor (viac informacii v [sekcii](#env-variables))
- Spustit prikazom **npm start**

Na localhoste appka funguje na porte 3000, cize sa da na nu pripojit cez http://localhost:3000

### Input

JSON body s povinnymi parametrami amount a currencyCode
Priklad:

> {<br>
> "suma": 160,<br>
> "kodMeny": "USD",<br>
> "datumKonverznehoListka": "2018-05-01"<br>
> }

### Output

Priklad ako vyzera odpoved:

> {<br>
> "USD": "Zkonvertovana suma pre menu USD je 160 s kurzom 1 zo zakladnej meny: USD",<br>
> "AED": "Zkonvertovana suma pre menu AED je 587.6 s kurzom 3.6725 zo zakladnej meny: USD",<br>
> "AFN": "Zkonvertovana suma pre menu AFN je 14019.952000000001 s kurzom 87.6247 zo zakladnej meny: USD",<br>
> "ALL": "Zkonvertovana suma pre menu ALL je 18298.016 s kurzom 114.3626 zo zakladnej meny: USD",<br>
> "AMD": "Zkonvertovana suma pre menu AMD je 73043.96800000001 s kurzom 456.5248 zo zakladnej meny: USD",<br>
> "ANG": "Zkonvertovana suma pre menu ANG je 286.4 s kurzom 1.79 zo zakladnej meny: USD",<br>
> .... atd...<br>
> }

### Env variables

Aby sa proxy API vedelo connectnut na externy service odkial berie kurzy k jednotlivym menam - https://www.exchangerate-api.com/docs/authentication, potrebuje mat zadefinovane v env variables url a api key, napriklad(hodnoty musia byt nahradene realnymi hodnotami):

> EXCHANGE_RATE_API_KEY='https://exchange-rate.url.example'<br>
> EXCHANGE_RATE_URL='somesecretapikey'

Subor z env variables sa musi volat **.env** a byt umiestneny v roote projektu.

## Testy

Na zbehnutie testov treba zbehnut prikaz **npm test**<br>
Na uspesne zbehnutie testov treba mat aplikaciu pokrytu aspon na 90% testami, viac informacii o pokryty testami ponukne nyc package po zbehnuti npm test prikazu.

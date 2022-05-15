# kurzovy-listok

## POST {server}/kurzovy-listok

API generuje zoznam dostupnych mien s ich kurzami a prepocitanou sumou na ne, ktora bola zadana pri volani tohto API

### Input

JSON body s povinnymi parametrami amount a currencyCode
Priklad:
{
"amount": 160,
"currencyCode": "USD"
}

### Output

Priklad ako vyzera odpoved:
{
"USD": "Converted amount for currency code USD is 160 with rate 1",
"AED": "Converted amount for currency code AED is 587.6 with rate 3.6725",
"AFN": "Converted amount for currency code AFN is 14019.952000000001 with rate 87.6247",
"ALL": "Converted amount for currency code ALL is 18298.016 with rate 114.3626",
"AMD": "Converted amount for currency code AMD is 73043.96800000001 with rate 456.5248",
"ANG": "Converted amount for currency code ANG is 286.4 with rate 1.79",
.... atd...
}

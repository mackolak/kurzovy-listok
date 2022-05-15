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

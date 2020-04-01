# Pukkelpop Applicatie

## Usage
Je moet gebruiken van Docker om deze applicatie te kunnen runnen.

Je moet ingelogd zijn met je Docker-ID om de applicatie te kunnen builden.

Gebruik `localhost` indien je gebruik maakt van Windows Pro/Education of een Unix systeem

Gebruik `http://192.168.99.100/` indien je gebruik maakt van de Docker Toolbox

## Algemene uitleg
Gebruik `docker-compose up` om een `docker-compose.yml` te runnen.

`-f` wordt gebruikt om een specifieke `docker-compose.yml` te selecteren

**Options:**

`--build` wordt gebruikt om een image te maken

`-d` wordt gebruikt om dit commando in de achtergrond te laten runnen.

## De Applicatie Starten

### Debug
`docker-compose -f docker-compose.debug.yml up [OPTIONS]`

Debug wordt gebruikt om de applicatie aan te passen a.d.h.v volumes.

De paden van de volumes kunnen toegevoegd worden in de `docker-compose.*.yml` file.

### Productie:
`docker-compose -f docker-compose.prod.yml up`

Productie maakt gebruik van een externe database en een optimized build van de web applicatie.

Gebruik deze modus niet om veranderingen aan te brengen, volumes zijn hiervoor niet ingesteld waardoor je veranderingen niet worden doorgevoerd.

## Opdeling Applicatie
### 1. Web applicatie
De folder `client-web` bevat alle code van de web applicatie

### 2. Rest API
De folder `server` bevat alle code van de rest api

### 3. Nginx
De folder `nginx` bevat de routing voor de `server` en de `client-web` 
# Pukkelpop Applicatie

## Gebruik
Je moet gebruiken van Docker of Docker Toolbox om deze applicatie te kunnen runnen.

Deze applicatie bevat 2 modi:
- Debug (Development)
- Productie

### Debug
Je start de applicatie in deze modus indien je aanpassingen wil aanbrengen aan de code.

```
$ docker-compose -f docker-compose.debug.yml up [OPTIONS]
```
**Options:**

`--build` wordt gebruikt om een image te maken

`-d` wordt gebruikt om dit commando in de achtergrond te laten runnen.

**Runtime**

Web applicatie is bereikbaar via: `localhost` (Docker) of `http://192.168.99.100` (Docker Toolbox)

Rest API is bereikbaar via `localhost/api` (Docker) of `http://192.168.99.100/api` (Docker Toolbox)

Mobiele applicatie is bereikbaar via `localhost:81` (Docker) of `http://192.168.99.100:81` (Docker Toolbox)

Database (PostgreSQL) is bereikbaar via een container. 

### Productie
Je start de applicatie in deze modus indien je de applicatie wilt gebruiken op een echte server (productie)

```
$ docker-compose -f docker-compose.prod.yml up -d
```
**Runtime**

Web applicatie is bereikbaar via: `localhost` (Docker) of `http://192.168.99.100` (Docker Toolbox)

Rest API is bereikbaar via `localhost/api` (Docker) of `http://192.168.99.100/api` (Docker Toolbox)

Mobiele applicatie wordt niet geserved.

Database (PostgreSQL) wordt remote gehost uit veiligheid voor de applicatie.

## Project structuur
### 1. Web applicatie
De folder `client-web` bevat alle code van de web applicatie

### 2. Rest API
De folder `server` bevat alle code van de rest api

### 3. Mobiele applicatie
De folder `client-mobile` bevat alle code van de mobiele applicatie

### 4. Nginx
De folder `nginx` bevat de routing voor de `server` en de `client-web` 
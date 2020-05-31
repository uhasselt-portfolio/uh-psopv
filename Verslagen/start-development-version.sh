#!/bin/env bash

cd ../src/server

if test -f ".env";
then
	echo file exists
else
	echo file not exists
	cd ../
	cp server.env server/.env
	cd server
fi

cd ../../bin

docker system prune

docker-compose -f docker-compose.debug.yml up --build

# Check waarom de update niet gebeurd in de database, error console geplaatst in modify, uitlezen
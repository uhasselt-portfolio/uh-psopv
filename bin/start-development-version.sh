#!/bin/env bash

cd ../src/server

if test -f ".env";
then
	echo file server exists
else
	echo file server not exists
	cd ../
	cp server.env server/.env
	cd server
fi

cd ../client-mobile

if test -f ".env";
then
	echo file mobile exists
else
	echo file mobile not exists
	cd ../
	cp mobile.env client-mobile/.env
	cd client-mobile
fi

cd ../../bin

docker system prune

docker-compose -f docker-compose.debug.yml up --build
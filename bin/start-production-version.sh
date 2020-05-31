#!/bin/env bash

GREEN='\033[0;32m'
RESET='\033[0m'

echo -e "${GREEN}Starting production services... ${RESET}"

cd ../src/client-mobile

npm install

ionic cap sync

ionic cap run android --prod


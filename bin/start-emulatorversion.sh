#!/bin/env bash

GREEN='\033[0;32m'
RESET='\033[0m'

echo -e "${GREEN}Starting production services... ${RESET}"

cd ../src/client-mobile

npm install

ionic cap sync

ionic cap run android --prod

echo "wanneer android studio is opgestart, zal u het volgende moeten toevoegen aan android/app/src/main/res/values/string.xml"
echo '<string name="mauron85_bgloc_account_name">$ACCOUNT_NAME</string> \n
    <string name="mauron85_bgloc_account_type">$ACCOUNT_TYPE</string> \n
    <string name="mauron85_bgloc_content_authority">$CONTENT_AUTHORITY</string>'
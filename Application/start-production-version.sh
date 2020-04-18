GREEN='\033[0;32m'
RESET='\033[0m'

echo -e "${GREEN}Successfully deployed on Heroku ${RESET}"

cd services/client-mobile

ionic cap run android --prod


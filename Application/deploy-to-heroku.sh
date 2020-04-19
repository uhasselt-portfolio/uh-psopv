heroku login
heroku container:login

docker image rm server-production:1.0 -f
docker build -f ./services/server/Dockerfile.web --tag server-production:1.0 .

heroku container:push web --app=psopv --recursive

heroku container:release web --app=psopv
# Never use latest, always a version
FROM node:13.10

# The destination of our app in the container
WORKDIR /usr/src/app

# Moves the package.json, package-loc.json and tsconfig.json to the specified workdir
COPY package*.json ./
COPY tsconfig.json ./

# Create user and postgres
ENV POSTGRES_USER root
ENV POSTGRES_PASSWORD 12345
ENV POSTGRES_DB postgres
ENV POSTGRES_URI 'postgres://postgres:12345@postgres:5432/postgres'

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
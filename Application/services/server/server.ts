import * as http from 'http';
import {config} from "dotenv";
import app from "./src/app";
import getConnection from "./src/api/models/connection";

config();
getConnection().sync();

const port = 3001; // Specified in the docker-compose file
const server = http.createServer(app);

server.listen(port);

console.log('Server is successfully running on port', port);
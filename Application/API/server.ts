import * as http from 'http';
import {config} from "dotenv";
import app from "./src/app";
import getConnection from "./src/api/models/connection";

config();
getConnection().sync();

const port = process.env.SERVER_PORT || 8080;
const server = http.createServer(app);

server.listen(port);

console.log('Listening on port ', port);
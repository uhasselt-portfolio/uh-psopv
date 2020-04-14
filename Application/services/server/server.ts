import * as http from 'http';
import {config} from "dotenv";
import app from "./src/app";
import getConnection from "./src/api/models/connection";
import seedDatabase from "./src/api/seeder/seeder";
import {Sequelize} from "sequelize-typescript";

const startServer = async () => {
    config();

    const connection: Sequelize = await getConnection();
    await connection.sync();

    const port = 3001; // Specified in nginx folder
    const server = http.createServer(app); // Init server

    server.listen(port); // Start server on port ...

    if(process.env.NODE_ENV == 'production') {
        console.log('Production back-end server started successfully');
    } else {

        await seedDatabase();

        console.log('Debug back-end server started successfully');
    }
}

startServer();
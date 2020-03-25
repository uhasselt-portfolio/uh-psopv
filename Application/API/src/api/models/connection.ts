import {Sequelize} from 'sequelize-typescript';

const warning = "Create .env file with your database credentials.";

function getConnectionCredentials() : Sequelize {
    return new Sequelize(
        process.env.PG_URI || warning, {
            dialectOptions: {
                ssl: true
            },
            host: process.env.PG_HOST,
            dialect: 'postgres',
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            },
            models: [__dirname + '\\*.model.ts']
        });
}

function getConnection() : Sequelize {

    const connectionCredentials = getConnectionCredentials();

    try {
        connectionCredentials.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        console.error('Connection credentials: ', connectionCredentials);
    }

    return connectionCredentials;
}

export default getConnection;


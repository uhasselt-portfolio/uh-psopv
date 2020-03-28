import {Sequelize} from 'sequelize-typescript';

const warning = "Create .env file with your database credentials.";

function getConnectionCredentials() : Sequelize {
    return new Sequelize(
        process.env.POSTGRES_URI || warning, {
            dialectOptions: {
                ssl: false // TODO: When ran on an production, set false -> true
            },
            dialect: 'postgres',
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            },
            models: [__dirname + '/*.model.ts'] // TODO: When ran on windows change / to \\
        });
}

function getConnection() : Sequelize {

    const connectionCredentials = getConnectionCredentials();

    try {
        connectionCredentials.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    return connectionCredentials;
}

export default getConnection;


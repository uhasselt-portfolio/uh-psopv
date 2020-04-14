import {Sequelize} from 'sequelize-typescript';

const warning = "Create .env file with your database credentials.";

function getConnectionCredentials(): Sequelize {
    const sslMode: boolean = process.env.NODE_ENV == 'production';

    return new Sequelize(
        process.env.POSTGRES_URI || warning, {
            dialectOptions: {
                ssl: sslMode
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

const getConnection = async (): Promise<Sequelize> =>  {

    const connectionCredentials = getConnectionCredentials();

    try {
        await connectionCredentials.authenticate();
        console.log('Connection has been established successfully.');

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    return connectionCredentials;
}

export default getConnection;
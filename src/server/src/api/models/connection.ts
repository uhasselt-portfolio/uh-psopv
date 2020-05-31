import {Sequelize} from 'sequelize-typescript';

/**
 * PostgreSQL connection class
 *
 * @author Michiel Swaanen
 *
 */

const warning = "Create .env file with your database credentials.";

/**
 * Connection credentials
 */
function getConnectionCredentials(): Sequelize {
    const sslMode: boolean = process.env.NODE_ENV == 'production';

    return new Sequelize(
        process.env.POSTGRES_URI || warning, {
            dialectOptions: {
                ssl: sslMode
            },
            logging: false,
            dialect: 'postgres',
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            },
            models: [__dirname + '/*.model.ts']
        });
}

/**
 * Establishes a pool between the server and the database
 */
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
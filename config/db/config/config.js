import 'dotenv/config'

/* export const DB_CONFIG = {
    HOST: 'dpg-clj9jrtae00c7384q3ag-a.oregon-postgres.render.com', //process.env.HOST || "localhost",
    PORT: 5432,
    USER: 'admin', //process.env.USER || "postgres",
    PASS: 'Zayvmmoma5yhpPThZHkRhnOEmWj3FqOd', // process.env.PASSWORD || "postgres",
    DB: 'dc',
    DIALECT: 'postgres',
    pool: {
        max: 5, //maximum number of connection in pool
        min: 0, //minimum number of connection in pool
        acquire: 30000, //maximum time, in milliseconds, that pool will try to get connection before throwing error
        idle: 10000 // maximum time, in milliseconds, that a connection can be idle before being released
    }
};
 */

export const DB_CONFIG = {
    HOST: process.env.HOST,
    PORT: 5432,
    USER: process.env.USER,
    PASS: process.env.PASS,
    DB: 'dc',
    DIALECT: 'postgres',
    pool: {
        max: 5, //maximum number of connection in pool
        min: 0, //minimum number of connection in pool
        acquire: 30000, //maximum time, in milliseconds, that pool will try to get connection before throwing error
        idle: 10000 // maximum time, in milliseconds, that a connection can be idle before being released
    }
};


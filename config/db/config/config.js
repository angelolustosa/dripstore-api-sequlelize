import 'dotenv/config'

export const DB_CONFIG = {
    HOST: process.env.HOST || "localhost",
    PORT: process.env.PORT || 5432,
    USER: process.env.USER || "postgres",
    PASSWORD: process.env.PASSWORD || "postgres",
    DB: process.env.DB || 'dc',
    dialect: process.env.DIALECT || "postgres",
    pool: {
        max: 5, //maximum number of connection in pool
        min: 0, //minimum number of connection in pool
        acquire: 30000, //maximum time, in milliseconds, that pool will try to get connection before throwing error
        idle: 10000 // maximum time, in milliseconds, that a connection can be idle before being released
    }
};



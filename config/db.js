// config/config.js
import { Sequelize } from 'sequelize';
import { DB_CONFIG } from './db/config/config.js';
import 'dotenv/config' //https://www.npmjs.com/package/dotenv#how-do-i-use-dotenv-with-import
import { produtoModel } from '../models/produto.model.js';


const sequelize = new Sequelize(DB_CONFIG.DB, DB_CONFIG.USER, DB_CONFIG.PASSWORD,
    // process.env.DB_DATABASE || DB_CONFIG.DB,
    // process.env.DB_USERNAME || DB_CONFIG.USER,
    // process.env.DB_PASSWORD || DB_CONFIG.PASSWORD,
    {
        host: process.env.DB_HOST || DB_CONFIG.HOST,
        dialect: process.env.DB_HOST || DB_CONFIG.dialect,
        //operatorsAliases: false,
        port: process.env.PORT || DB_CONFIG.PORT,

        pool: { ...DB_CONFIG.pool },
        /*  pool: {
             max: DB_CONFIG.pool.max,
             min: DB_CONFIG.pool.min,
             acquire: DB_CONFIG.pool.acquire,
             idle: DB_CONFIG.pool.idle
         }, */
        /* logging: true,
        sync: true, //create the table if it not exists */
    }
);

sequelize.authenticate().then(() => {
    console.log('[INFO] Connection has been established successfully.');
}).catch((error) => {
    console.error('[ERROR] Unable to connect to the database: ', error);
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.produto = produtoModel(sequelize, Sequelize);

export default db;
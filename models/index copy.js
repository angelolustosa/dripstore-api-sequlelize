import Sequelize from 'sequelize'
import { DB_CONFIG } from '../config/db/config/config.js';
import { produtoModel } from './produto.model.js';
import { sequelize } from '../config/db.js';


/* const sequelize = new Sequelize(DB_CONFIG.DB, DB_CONFIG.USER, DB_CONFIG.PASSWORD, {
    host: DB_CONFIG.HOST,
    dialect: DB_CONFIG.dialect,
    //operatorsAliases: false,
    pool: {
        max: DB_CONFIG.pool.max,
        min: DB_CONFIG.pool.min,
        acquire: DB_CONFIG.pool.acquire,
        idle: DB_CONFIG.pool.idle
    }
}); */

sequelize.authenticate().then(() => {
    console.log('[INFO] Connection has been established successfully.');
}).catch((error) => {
    console.error('[ERROR] Unable to connect to the database: ', error);
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.produto = produtoModel(sequelize, Sequelize);
db.categoria = categoriaModel(sequelize, Sequelize);

export default db
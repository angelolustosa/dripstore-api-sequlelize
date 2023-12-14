// config/config.js
import { Sequelize } from 'sequelize';
import { DB_CONFIG } from './db/config/config.js';

let URL_RENDER_POSTGRES = `${DB_CONFIG.DIALECT}://${DB_CONFIG.USER}:${DB_CONFIG.PASS}@${DB_CONFIG.HOST}:${DB_CONFIG.PORT}/postgres`

console.log('URL_RENDER_POSTGRES', URL_RENDER_POSTGRES, 'postgres://postgres:postgres@localhost:5432/postgres');
// Agora, você pode conectar diretamente ao banco de dados "dc"
const sequelizePostgres = new Sequelize(URL_RENDER_POSTGRES, {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false, // Configuração para evitar o erro "SSL/TLS required"
        },
        keepAlive: true,
    },
    ssl: true,
});

sequelizePostgres.authenticate().then(() => {
    console.log('[INFO] Connection POSTGRES has been established successfully.',);
}).catch((error) => {
    console.error('[ERROR] Unable to connect to the database: ', error);
});

// Query SQL para verificar se o banco de dados "dc" já existe
const checkDatabaseQuery = `
      SELECT datname FROM pg_database WHERE datname = '${DB_CONFIG.DB || 'dc'}';
    `;

try {
    // Executa a query para verificar se o banco de dados existe
    const result = await sequelizePostgres.query(checkDatabaseQuery, { type: Sequelize.QueryTypes.SELECT });

    if (result.length === 0) {
        // O banco de dados "dc" não existe, então podemos criá-lo
        await sequelizePostgres.query(`CREATE DATABASE ${db.DB || 'dc'};`);
    } else {
        // O banco de dados "dc" já existe
        console.log(`Banco de dados ${DB_CONFIG.DB || 'dc'} já existe.`);
    }

    sequelizePostgres.close()
    console.log('[INFO] Connection POSTGRES closed!',);
} catch (error) {
    console.error('Erro:', error);
}

let URL_RENDER_DC = `${DB_CONFIG.DIALECT}://${DB_CONFIG.USER}:${DB_CONFIG.PASS}@${DB_CONFIG.HOST}:${DB_CONFIG.PORT}/${DB_CONFIG.DB}`


export const sequelize = new Sequelize(URL_RENDER_DC, {
    pool: { ...DB_CONFIG.pool },
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false, // Configuração para evitar o erro "SSL/TLS required"
        },
        keepAlive: true,
    },
    ssl: true,
}
);

console.log('URL_RENDER_POSTGRES', URL_RENDER_POSTGRES, 'postgres://postgres:postgres@localhost:5432/postgres');

sequelize.authenticate().then(() => {
    console.log('[INFO] Connection DC has been established successfully.',);
}).catch((error) => {
    console.error('[ERROR] Unable to connect to the database: ', error);
});
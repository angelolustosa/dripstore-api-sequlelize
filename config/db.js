// config/config.js
import { Sequelize } from 'sequelize';
import { DB_CONFIG } from './db/config/config.js';
import 'dotenv/config' //https://www.npmjs.com/package/dotenv#how-do-i-use-dotenv-with-import

// Agora, você pode conectar diretamente ao banco de dados "dc"
const sequelizePostgres = new Sequelize(process.env.URL_RENDER_POSTGRES || 'postgres://postgres:postgres@localhost:5432/postgres', {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false, // Configuração para evitar o erro "SSL/TLS required"
        },
    },
});

// Query SQL para verificar se o banco de dados "dc" já existe
const checkDatabaseQuery = `
      SELECT datname FROM pg_database WHERE datname = '${process.env.DB || 'dc'}';
    `;

try {
    // Executa a query para verificar se o banco de dados existe
    const result = await sequelizePostgres.query(checkDatabaseQuery, { type: Sequelize.QueryTypes.SELECT });

    if (result.length === 0) {
        // O banco de dados "dc" não existe, então podemos criá-lo
        await sequelizePostgres.query(`CREATE DATABASE ${process.env.DB || 'dc'};`);
    } else {
        // O banco de dados "dc" já existe
        console.log(`Banco de dados ${process.env.DB || 'dc'} já existe.`);
    }
} catch (error) {
    console.error('Erro:', error);
}

export const sequelize = new Sequelize(DB_CONFIG.DB, DB_CONFIG.USER, DB_CONFIG.PASSWORD,
    {
        host: DB_CONFIG.HOST,
        dialect: DB_CONFIG.dialect,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false, // Configuração para evitar o erro "SSL/TLS required"
            },
        },
        port: DB_CONFIG.PORT,
        pool: { ...DB_CONFIG.pool },
        //logging: false
    }
);

sequelize.authenticate().then(() => {
    console.log('[INFO] Connection has been established successfully.');
}).catch((error) => {
    console.error('[ERROR] Unable to connect to the database: ', error);
});
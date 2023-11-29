// config/config.js
import { Sequelize } from 'sequelize';
import { DB_CONFIG } from './db/config/config.js';
import 'dotenv/config' //https://www.npmjs.com/package/dotenv#how-do-i-use-dotenv-with-import





// async function init() {
// Conectar ao banco de dados principal para verificar se "dc" existe
/* const sequelizeMaster = new Sequelize('postgres://seu_usuario:sua_senha@localhost:5432/postgres', {
  dialect: 'postgres',
}); */

// Agora, você pode conectar diretamente ao banco de dados "dc"
const sequelizePostgres = new Sequelize('postgres://postgres:postgres@localhost:5432/postgres', {
    dialect: 'postgres',
});

// Query SQL para verificar se o banco de dados "dc" já existe
const checkDatabaseQuery = `
      SELECT datname FROM pg_database WHERE datname = 'dc';
    `;

try {
    // Executa a query para verificar se o banco de dados existe
    const result = await sequelizePostgres.query(checkDatabaseQuery, { type: Sequelize.QueryTypes.SELECT });

    if (result.length === 0) {
        // O banco de dados "dc" não existe, então podemos criá-lo
        await sequelizePostgres.query('CREATE DATABASE dc;');
    } else {
        // O banco de dados "dc" já existe
        console.log('Banco de dados "dc" já existe.');
    }
} catch (error) {
    console.error('Erro:', error);
}/*  finally {
      // Certifique-se de fechar as conexões
      await sequelizeMaster.close();
    } */
//}


// sequelizePostgres.options.database = 'dc';  // Altera a configuração do banco de dados para "dc"
// export const sequelize = new Sequelize(sequelizePostgres.options);

export const sequelize = new Sequelize(DB_CONFIG.DB, DB_CONFIG.USER, DB_CONFIG.PASSWORD,
    {
        host: process.env.DB_HOST || DB_CONFIG.HOST,
        dialect: process.env.DB_HOST || DB_CONFIG.dialect,
        port: process.env.PORT || DB_CONFIG.PORT,
        pool: { ...DB_CONFIG.pool },
        /*  pool: {
             max: DB_CONFIG.pool.max,
             min: DB_CONFIG.pool.min,
             acquire: DB_CONFIG.pool.acquire,
             idle: DB_CONFIG.pool.idle
         }, */
        //logging: false
    }
);

sequelize.authenticate().then(() => {
    console.log('[INFO] Connection has been established successfully.');
}).catch((error) => {
    console.error('[ERROR] Unable to connect to the database: ', error);
});


/* sequelize.sync({ force: true }).then(() => {
    console.log('Tabelas sincronizadas com sucesso!');
}).catch((error) => {
    console.error('Erro ao sincronizar tabelas:', error);
});
 */

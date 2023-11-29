import Sequelize, { DataTypes } from 'sequelize'
import { DB_CONFIG } from '../config/db/config/config.js';
import { produtoModel } from './produto.model.js';
import { sequelize } from '../config/db.js';
import { categoriaModel } from './categoria.model.js';

sequelize.authenticate().then(() => {
    console.log('[INFO] Connection has been established successfully.');
}).catch((error) => {
    console.error('[ERROR] Unable to connect to the database: ', error);
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const Produto = produtoModel(sequelize, Sequelize);
const Categoria = categoriaModel(sequelize, Sequelize);

db.produto = Produto
db.categoria = Categoria

// Produto.belongsTo(Categoria, { foreignKey: 'id_categoria', as: 'categoria' });
// Categoria.hasMany(Produto, { foreignKey: 'id_categoria', as: 'produto' });

// Corrige a associação para especificar explicitamente o nome da coluna
Produto.belongsTo(Categoria, {
    foreignKey: 'categoriaId', // nome correto da coluna
    as: 'categoria',
  });
  
  Categoria.hasOne(Produto, {
    foreignKey: 'categoriaId', // nome correto da coluna
  });

export default db
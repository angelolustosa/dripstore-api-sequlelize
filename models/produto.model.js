import { DataTypes } from "sequelize";

export const produtoModel = (sequelize, Sequelize) => {
  const Produto = sequelize.define("produto", {
    nome: {
      type: Sequelize.STRING
    },
    categoria: {
      type: Sequelize.STRING
    },
    descricao: {
      type: Sequelize.STRING
    },
    desconto: {
      type: DataTypes.INTEGER
    },
    precoAntes: {
      type: DataTypes.DECIMAL
    },
    precoDepois: {
      type: DataTypes.DECIMAL
    },
    ativo: {
      type: Sequelize.BOOLEAN,
      defaultValue: true // https://stackoverflow.com/questions/73808834/how-to-change-default-value-after-delete-with-sequelize-model-and-nodejs

    }
  });

  /*  sequelize.sync().then(() => {
     console.log('[INFO-MODEL] Produto table created successfully!');
   }).catch((error) => {
     console.error('[ERROR] Unable to create table : ', error);
   }); */

  return Produto;
};
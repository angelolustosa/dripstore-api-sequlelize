import { DataTypes } from "sequelize";

export const categoriaModel = (sequelize, Sequelize) => {
  const Categoria = sequelize.define("categoria", {
    nome: {
      type: Sequelize.STRING,
    },
    codigo: {
      type: DataTypes.INTEGER
    },
  });

  return Categoria;
};

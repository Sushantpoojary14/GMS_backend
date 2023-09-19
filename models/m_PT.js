const { Sequelize } = require("../databases/connection");

module.exports = (sequelize, DataTypes) => {
  const M_PT = sequelize.define("M_PT", {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    m_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      indexedDB: true,
      references: {
        model: "Members",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    t_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      indexedDB: true,
      references: {
        model: "Trainers",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    start_date: {
      type: DataTypes.STRING(20),
      //   allowNull: false,
    },
    end_date: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    total_month: {
      type: DataTypes.INTEGER(6),
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER(6),
      allowNull: false,
    },
  });
  return M_PT;
};

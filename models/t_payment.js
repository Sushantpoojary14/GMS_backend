const { Sequelize } = require("../databases/connection");

module.exports = (sequelize, DataTypes) => {
  const T_Payment = sequelize.define(
    "T_Payment",
    {
      // Model attributes are defined here
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      t_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        indexedDB: true,
        references: {
            model: 'Trainers',
            key: 'id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
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
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      fee: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
    },

  );
  return T_Payment;
};

const { Sequelize } = require("../databases/connection");

module.exports = (sequelize, DataTypes) => {
  const Trainer = sequelize.define(
    "Trainer",
    {
      // Model attributes are defined here
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      u_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        indexedDB: true,
        references: {
            model: 'Users',
            key: 'id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
      },
      email: {
        type: DataTypes.STRING(40),
        //   allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      gender: {
        type: DataTypes.ENUM("male", "female", "other"),
        allowNull: false,
      },
      DOB: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      payment: {
        type: DataTypes.INTEGER(11),
        // allowNull: false,
      },
      status: {
        type: DataTypes.INTEGER(2),
        defaultValue:1,
        allowNull: false,
      },
    },

  );
  return Trainer;
};

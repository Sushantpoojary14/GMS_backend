const { Sequelize } = require("../databases/connection");

module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define(
    "Member",
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
        type: DataTypes.STRING(90),
        //   allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
      gender: {
        type: DataTypes.ENUM("male", "female", "other"),
        allowNull: false,
      },
      occupation: {
        type: DataTypes.STRING(40),
        // allowNull: false,
      },
      DOB: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      weight_kg: {
        type: DataTypes.INTEGER(11),
        // allowNull: false,
      },
      height_cm: {
        type: DataTypes.INTEGER(11),
        // allowNull: false,
      },
      blood_group: {
        type: DataTypes.STRING(10),
        // allowNull: false,
      },
      program: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      status: {
        type: DataTypes.INTEGER(2),
        defaultValue:1,
        allowNull: false,
      },
    },

  );
  return Member;
};

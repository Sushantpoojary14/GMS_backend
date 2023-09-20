const { Sequelize } = require("../databases/connection");

module.exports = (sequelize, DataTypes) => {
  const Attendance = sequelize.define(
    "Attendance",
    {

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
      date: {
        type: DataTypes.STRING(40),
        //   allowNull: false,
      },
      time: {
        type: DataTypes.STRING(11),
        allowNull: false,
      },
    },

  );
  return Attendance;
};

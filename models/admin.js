module.exports = (sequelize, DataTypes) => {
    const Admin =sequelize.define(
      "Admin",
      {
        // Model attributes are defined here
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
  
        email: {
          type: DataTypes.STRING(40),
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING(150),
          allowNull: false,
          // allowNull defaults to true
        },
      },
      {
        // Other model options go here
      }
      );
      return Admin;
  };
  
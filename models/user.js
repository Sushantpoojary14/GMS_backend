module.exports = (sequelize, DataTypes) => {
  const User =sequelize.define(
    "User",
    {
      // Model attributes are defined here
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(60),
        // allowNull: false,
      },
      logo: {
        type: DataTypes.STRING(100),
        // allowNull: false,
      },
      gym_name: {
        type: DataTypes.STRING(80),
        // allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(50),
        // allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(150),
        allowNull: false,
      
      },
    },
  
    );
    return User;
};

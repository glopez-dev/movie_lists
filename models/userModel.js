const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database.js');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pseudo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

User.sync()
  .then( () => {
    console.log('Model User synchronized with the DB');
  })
  .catch( err => {
    console.error('Error while synchronizing model User with the DB :', err);
  });

module.exports = User;


const { DataTypes } = require('sequelize');
const sequelize = require('../database.js');

const WatchList = sequelize.define('WatchList', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^#([0-9A-Fa-f]{3}){1,2}$/ // Expression régulière pour valider le format hexadécimal
    }
  }
});

WatchList.sync()
  .then( () => {
    console.log('Model WatchList synchronized with the DB');
  })
  .catch( err => {
    console.error('Error while synchronizing model WatchList with the DB :', err);
  )};

module.exports = WatchList;


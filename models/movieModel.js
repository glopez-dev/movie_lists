const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database.js');

const Movie = sequelize.define('Movie', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  review: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

Movie.sync()
  .then( () => {
    console.log('Model Movie synchronized sucessfully !');
  })
  .catch( err => {
    console.error('Error while synchronizing model Movie with the DB : ', err);
  });

module.exports = Movie;

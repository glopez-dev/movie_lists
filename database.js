const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('MOVIE_LISTS', 'movie_lists', 'MrT6c52vF43j5N#EWs$', {
  host : 'localhost',
  dialect : 'mysql',
});

// Testing DB connexion
//
sequelize.authenticate()
  .then( () => {
    console.log('Sucessfully connected to DB');
  })
  .catch( err => {
    console.error('Error while connecting to DB : ', err);
  });

module.exports = sequelize;

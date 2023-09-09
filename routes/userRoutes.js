const express = require('express');
const hashPassword = require('../middlewares/hashPasswordMiddleware.js');
const User = require('../models/userModel.js');
const { Op } = require('sequelize');

const router = express.Router();

// Récuperer tous les utilisateurs
//
router.get('/users', getAllUsers);

// Récupération d'un utilisateur dans la Database
//
router.get('/users/:id', getUser);

// Enregistrement de l'utilisateur dans la DB
//
router.post('/users', hashPassword, createUser);

// Modification de l'utilisateur dans la DB
// 
router.put('/users/:id', hashPassword, updateUser);

// Supprimer un utilisateur par ID
//
router.delete('/users/:id', deleteUser);

async function getAllUsers(req, res) {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    if (error instanceof Sequelize.DatabaseError) {
      console.error(`Database error while getting all Users:`, error);
      res.status(500).json({ error: 'Database error' });
    } else {
      console.error(`Error while getting all Users:`, error);
      res.status(404).json({ error: 'Request failed' });
    }
  }
}

function getUser(req, res, next) {
  const userId = req.params.id; 

  // Validation des données entrantes
  if (!userId) {
    return res.status(400).json({ error: 'Invalid user ID.'});
  }

  // Objet de requete sequelize
  const sqlQuery = {
    where: { id : userData.id } 
  };

  User.findOne(sqlQuery)
  .then( user => {
      user  
        ? res.status(200).json(user) 
        : res.status(404).json({ error: `User ${userData.id} not found.`});
  })
  .catch( err => {
      console.error('Database error : ', err);
      res.status(500).json({ error: 'Internal server error : '+ err});
  });

}

async function updateUser(req, res) {
  const userId = req.params.id;
  const userData = req.body.user;
  const sqlQuery = {
    where: {id: userId}
  }

  try {
    const updatedUser = await User.update(userData, sqlQuery)
    console.log(`User with ID #${userId} successfully updated.`);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(`Error while updating User with ID ${userId}:`, err);
    res.status(500).json({ error: 'Failed to update user.' });
  }
}

function createUser(req, res) {
  const userData = req.body.user;

  User.create(userData)
    .then(newUser => {
      console.log(`User ${newUser.name} (id: #${newUser.id}) successfully created.`);
      res.status(201).json({ id: newUser.id, name: newUser.name });
    })
    .catch(err => {
      console.error('Error while creating new User:', err);
      res.status(500).json({ error: 'Failed to create user.' });
    });
};

async function deleteUser(req, res) {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);

    if (!user) 
      return res.status(404).json({error: `User with ID ${userId} not found.`});
    
    await user.destroy();

    res.status(200).json({message: `User with ID ${userId} has been deleted.`});
  } catch (error) {
    console.error(`Error deleting user #${userId} : `, err);
    res.status(500).json({error: `Internal server error.`});
  }
}




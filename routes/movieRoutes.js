const express = require('express');
const Movie = require('../models/movieModel.js');
const { Op } = require('sequelize');

const router = express.Router();

router.get('/movies', getAllMovies);

router.get('/movies/:id', getMovie);

router.post('/movies', createMovie);

router.put('/movies/:id', updateMovie);

router.delete('/movies/:id', deleteMovie);

// Middlewares
//
async function getAllMovies(req, res) {
  try {
    const movies = await Movie.findAll();
    res.status(200).json(movies)
  } catch (error) {
     if (error instanceof Sequelize.DatabaseError) {
      console.error(`Database error while getting all Movies :`, error);
      res.status(500).json({ error: 'Database error' });
    } else {
      console.error(`Error while getting all Movies :`, error);
      res.status(404).json({ error: 'Request failed' });
    }
  }
}

async function getMovie(req, res) {
  const movieId = req.params.id;

  if (!movieId) {
    return res.status(400).json({error: 'Invalid Movie ID.'});
  }  

  try {
    const movie = Movie.findByPk(movieId);
    res.status(200).json(movie);
  } catch (error) {
     if (error instanceof Sequelize.DatabaseError) {
      console.error(`Database error while getting Movie ${movieId} :`, error);
      res.status(500).json({ error: 'Database error' });
    } else {
      console.error(`Error while getting Movie ${movieId} :`, error);
      res.status(404).json({ error: 'Request failed' });
    }
  }
}

async function createMovie(req, res) {
  const movieData = req.body.movie;
  try {
    await Movie.create(movieData);
    console.log('New movie added successfully.')
    res.status(200).json({message: 'New movie added successfully'});
  } catch (error) {
    console.error('Failed to add new movie', error);
    res.status(500).json({error: 'Failed to add new movie'});
  }
}

async function updateMovie(req, res) {
  const movieId = req.params.id;
  const movieData = req.body.movie;
  const sqlQuery = { where: {id: movieId}};

  try {
    const updatedMovie = await Movie.update(movieData, sqlQuery);
    console.log(`Movie whith ID #${movieId} successfully updated.`);
    res.status(200).json({success: true, data: {message: 'Movie updated successfully.'}});
  } catch (error) {
    console.error('Failed to update Movie #${movieId} :', error);
    res.status(404).json({success: false, error: error});
  }
}

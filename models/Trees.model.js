


const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: String,
  overview: String,  
  poster_path: String,
  adult: Boolean,
  backdrop_path: String,
  id: Number,
  original_language: String,
  original_title: String,
  media_type: String,
  genre_ids: [Number],
  popularity: Number,
  release_date: String,
  video: Boolean,
  vote_average: Number,
  vote_count: Number,
  link_film: String,
  type: String,
  price: String,
});

const Movie = mongoose.model('movies', movieSchema);

module.exports = Movie;

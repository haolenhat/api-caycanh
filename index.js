const express = require("express");
const app = express();
require("dotenv").config();

const connectDB = require("./connectMongo");
connectDB();

const InfoUser = require('./models/infoUser.model'); // Import model InfoUser
const Movie = require('./models/Trees.model');
const User = require('./models/Users.model');
const redis = require('./redis');

app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// API lấy tất cả thông tin InfoUser
app.get('/api/info', async (req, res) => {
  try {
    const infoUsers = await InfoUser.find();
    res.json(infoUsers);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
//api tìm theo SDT
app.get('/api/info/:phone', async (req, res) => {
  try {
    const phone = req.params.phone;
    const infoUser = await InfoUser.findOne({ phone: phone });

    if (!infoUser) {
      return res.status(404).json({ error: 'Không tìm thấy thông tin người dùng cho số điện thoại đã nhập.' });
    }

    res.json(infoUser);
  } catch (error) {
    res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
  }
});

// API thêm thông tin mới vào InfoUser
app.post('/api/info', async (req, res) => {
  try {
    const newInfoUser = new InfoUser(req.body);
    const savedInfoUser = await newInfoUser.save();
    res.json(savedInfoUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Tree
app.get('/api/tree', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/addtree', async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    const savedMovie = await newMovie.save();
    res.json(savedMovie);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/tree/:id', async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedMovie);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/tree/:id', async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
    if (!deletedMovie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.json(deletedMovie);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// User
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/register', async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/users/:email', async (req, res) => {
  try {
    const foundUser = await User.findOne({ email: req.params.email });
    res.json(foundUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});

const mongoose = require('mongoose');

const infoUserSchema = new mongoose.Schema({
  name: String,
  nameUser: String,
  price: String,
  quantity: String,
  location: String,
  phone: String
});

// Đặt tên collection là 'infoUser' và database là 'test'
const InfoUser = mongoose.model('infoUser', infoUserSchema, 'infoUser', 'test');

module.exports = InfoUser;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const StatSchema = new Schema({
  name: {
    type: String,
    required: true
  },

  kills: {
    type: Number,
    default: 0
  },

  damage_dealt: {
    type: Number,
    default: 0
  }
  
});

module.exports = Stat = mongoose.model('stat', StatSchema);
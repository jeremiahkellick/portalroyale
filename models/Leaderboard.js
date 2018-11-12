const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const LeaderboardSchema = new Schema({
  name: {
    type: String,
    required: true
  },

  kills: {
    type: Integer,
    default: 0
  },

  death: {
    type: Integer,
    default: 1
  },

  damage_taken: {
    type: Double,
    default: 100.0
  },

  damage_dealt: {
    type: Double,
    default: 0.0
  }
});

module.exports = Leaderboard = mongoose.model('leaderboard', LeaderboardSchema);
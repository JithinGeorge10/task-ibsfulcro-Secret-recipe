import mongoose from 'mongoose';

const playerScoreSchema = new mongoose.Schema({
  playerName: {
    type: String,
    required: true,
    trim: true,
  },
  score: {
    type: Number,
    required: true,
  },
  attempts: {
    type: Number,
    default: 1,
  },
  time: {
    type: Number, 
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const PlayerScore = mongoose.model('PlayerScore', playerScoreSchema);
export default PlayerScore;

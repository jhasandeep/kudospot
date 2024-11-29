const mongoose = require("mongoose");

const kudosSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true,
  },
  receiver: {
    type: String, // User's name instead of ObjectId
    required: true,
  },
  badge: {
    type: String, // Badge name (e.g., "Best Employee", "Team Player", etc.)
    required: true,
  },
  message: {
    type: String,
    required: true, // Reason for giving kudos
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Kudos", kudosSchema);

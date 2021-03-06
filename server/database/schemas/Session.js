const mongoose = require('mongoose');

const { Schema } = mongoose;

const sessionSchema = new Schema({
  session: String,
  sessionId: String,
  expire: Date,
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;

const mongoose = require('mongoose');

mongoose.connect(process.env.DB_KEY, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;
const mongoose = require('mongoose')

// const DB_HOST = process.env.DB_HOST;
// const DB_NAME = process.env.DB_NAME;
// const DB_SSL_CA_PATH = process.env.DB_SSL_CA_PATH;
// const DB_USER=process.env.DB_USER;
// const DB_PASSWORD=process.env.DB_PASSWORD;

const connectDB = (db) => {
  mongoose.connect(db, ({useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }))
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err))
}

module.exports = {
  connectDB
}
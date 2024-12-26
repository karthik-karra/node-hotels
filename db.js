const mongoose = require('mongoose');
require('dotenv').config();

// define the mongodb connection url
// const mongoURL = 'mongodb://localhost:27017/myDatabase'
// const mongoURL = 'mongodb://localhost:27017/hoteldb';
const mongoURL = process.env.DB_URL;

mongoose.connect(mongoURL
// ,{
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }
// ,{
//     ssl: true
//   }
);

const db = mongoose.connection;

db.on('connected', ()=>{
    console.log('Connected to MongoDB server');
})

db.on('error', (err)=>{
    console.log('MongoDB connection error', err);
})

db.on('disconnected', ()=>{
    console.log('MongoDB is disconnected');
})

// export db
module.exports = db;
const mongoose = require('mongoose');

const mongoURL = process.env.MONGODB_URL_LOCAL;     
//const mongoURL = process.env.MONGODB_URL;           

mongoose.connect(mongoURL);         
const db = mongoose.connection;

//Defining event listeners

db.on('connected',()=>{
    console.log('connected to mongodb server');
})
db.on('error',(err)=>{
    console.log('Mongodb connection error',err);
})
db.on('disconnected',()=>{
    console.log('disconnected to mongodb server');
})

module.exports = db;

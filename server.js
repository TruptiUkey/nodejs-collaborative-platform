require('dotenv').config();   

const express = require('express');
const app = express();
const db = require('./db');     

const bodyParser = require('body-parser');      
app.use(bodyParser.json());                     
const PORT = process.env.PORT || 3000;          

app.get('/',function(req,res){   
    res.send('Welcome to the Real-Time Collaborative Platform.');
})

//const {jwtAuthMiddleware} = require('./jwt');

const userRoutes = require('./Routes/userRoutes');
const taskRoutes = require('./Routes/taskRoutes');

app.use('/auth',userRoutes);
app.use('/tasks',taskRoutes);

app.listen(PORT,()=>{
    console.log('Listening on port 3000');
})

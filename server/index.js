const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');

const app = express();

app.use(express.json())

const PORT = process.env.PORT || 4000;

app.use(cors())

const TodoItemRoute = require('./routes/todoItem')

mongoose.connect(process.env.DB_CONNECT)
.then(()=>{console.log('Base de datos conectado')})
.catch(err=> console.log(err))

app.listen(PORT, () => {
    console.log('Escuchando en el puerto 4000')
})

app.use('/', TodoItemRoute)
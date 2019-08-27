require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./routers/firstRouter');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

mongoose.connect(process.env.DB_KEY, { useNewUrlParser: true });

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(router);

http.listen(process.env.PORT);
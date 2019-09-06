require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const authRouter = require('./routers/authRouter');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use('/auth', authRouter);

http.listen(process.env.PORT, () => {
    console.log(`Server listening on ${process.env.PORT}...`);
});
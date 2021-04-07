'use strict';

require('dotenv').config();

const port = process.env.PORT || 3000;

const io = require('socket.io')(port);

const tracker = io.of('/tracker');

io.on('connection', (socket) => {
  console.log('connected to general socket server: ', socket.id)
})


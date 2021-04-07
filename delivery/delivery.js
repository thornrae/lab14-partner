'use strict';

const io = require('socket.io-client');

const host = 'http://localhost:3000';

io.connect(host);

const trackerConnection = io.connect(`${host}/tracker`);


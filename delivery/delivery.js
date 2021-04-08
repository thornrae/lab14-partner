'use strict';

const io = require('socket.io-client');

const host = 'http://localhost:3000';

io.connect(host);

const trackerConnection = io.connect(`${host}/tracker`);

trackerConnection.on('order-confirmation', deliveryUpdates)

function deliveryUpdates(payload) {
  setTimeout( () => {
    trackerConnection.emit('order-in-transit', payload)
  }, 2000)
  console.log('order-in-transit heard')

  setTimeout( () => {
    trackerConnection.emit('out-for-delivery', payload)
  }, 4000)
  console.log('out-for-delivery heard')
}
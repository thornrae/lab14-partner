'use strict';

const io = require('socket.io-client');

const host = 'http://localhost:3000';

io.connect(host);

const trackerConnection = io.connect(`${host}/tracker`);

trackerConnection.on('order-placed', orderConfirmation);
trackerConnection.on('order-in-transit', orderShipped);
trackerConnection.on('out-for-delivery', outForDelivery)
trackerConnection.on('package-received', deliveryConfirmation);

//payload.payload
function orderConfirmation (payload) {
  setTimeout( () => {
   trackerConnection.emit('order-confirmation', payload);

   console.log('order confirmed', payload);
  }, 1500)
}

function orderShipped(payload) {
  console.log(`Order # ${payload.orderId} has shipped`)
}

function outForDelivery(payload){
  console.log(`Order # ${payload.orderId} will be delivered today`)
}

function deliveryConfirmation(payload) {
  console.log(`${payload.customerName} has received ${payload.orderId}`)
}



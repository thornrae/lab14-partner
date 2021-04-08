'use strict';

require('dotenv').config();

const port = process.env.PORT || 3000;

const io = require('socket.io')(port);

const tracker = io.of('/tracker');

const faker = require('faker');

let deliveryqueue = {
  orders: {}
}

console.log('deliveryqueue...', deliveryqueue);

io.on('connection', (socket) => {
  console.log('connected to general socket server: ', socket.id)
})

tracker.on('connection', (socket) => {
  socket.on('order-placed', (payload) => {

    let payloadId = faker.datatype.number();
    //creating a deliveryq id
    //to put in the deliveryq ref. line 19
    deliveryqueue.orders[payload.orderId] = payload;
    console.log('DQ..', deliveryqueue)
    //OR add the id created to the payload you are expecting and then pass that payload
    socket.broadcast.emit('order-placed', payload)
    // socket.broadcast.emit('order-placed', payload)
  });
  console.log('connected to tracker: ', socket.id);

  socket.on('order-confirmation', (payload) => {
    socket.broadcast.emit('order-confirmation', payload);
  })

  socket.on('order-in-transit', (payload) => {
    socket.broadcast.emit('order-in-transit', payload)
  })

  socket.on('out-for-delivery', (payload) => {
    socket.broadcast.emit('out-for-delivery', payload);
  })

  socket.on('package-received', (payload) => {
    socket.broadcast.emit('package-received', payload);
    // console.log(''payload)

    delete deliveryqueue.orders[payload.orderId]
  })
  
  // console.log('post deleted q', deliveryqueue.orders)

})
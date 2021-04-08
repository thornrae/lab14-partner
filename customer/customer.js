'use strict';

const io = require('socket.io-client');

const host = 'http://localhost:3000';

io.connect(host);

const trackerConnection = io.connect(`${host}/tracker`);

const faker = require('faker');
const { Socket } = require('socket.io-client');

trackerConnection.on('order-confirmation', thankYouForYourOrder)

trackerConnection.on('order-in-transit', orderShipped)

trackerConnection.on('out-for-delivery', deliveryConfirmation);

setInterval( () => {
  let customerName = (faker.fake("{{name.lastName}}, {{name.firstName}}"));
  let address = (faker.fake("{{address.streetAddress}} {{address.city}}, {{address.state}}  {{address.zipCode}}"));
  let orderId = faker.datatype.number();

  let payload = {
    customerName: customerName,
    address: address, 
    orderId: orderId,
  }
  console.log(payload);

  trackerConnection.emit('order-placed', payload);

}, 7000);

function thankYouForYourOrder(payload) {
  console.log(`Thank you for order ${payload.customerName}. Shipping details will be sent to you soon.`)
}

function orderShipped(payload) {
  console.log(`Hi, ${payload.customerName}! Your order ${payload.orderId} has been shipped`)
}

function deliveryConfirmation(payload) {
  console.log(`Hey ${payload.customerName}, your package will be delivered by 8PM today!`)
  
  setTimeout( () => {
    trackerConnection.emit('package-received', payload);
  }, 2000)
}

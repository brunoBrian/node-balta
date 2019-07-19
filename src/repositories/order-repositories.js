'use strict';

const mongoose = require('mongoose');
const Order = mongoose.model('Order');

exports.get = async () => {
  const response = await Order
    .find({}, 'number status customer items')
    .populate('customer', 'name email')
    .populate('items.product', 'name description date');

  return response;
}

exports.create = async data => {
  let order = new Order(data);
  
  await order.save();
}
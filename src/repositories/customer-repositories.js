'use strict';

const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

exports.get = async () => {
  const response = await Customer.find({}, 'name email');

  return response;
}

exports.create = async data => {
  let customer = new Customer(data);
  
  await customer.save();
}

// exports.update = async (id, data) => {
//   await Product.findByIdAndUpdate(id, {
//     $set: {
//       name: data.name,
//       email: data.email,
//       password: data.password
//     }
//   });
// }
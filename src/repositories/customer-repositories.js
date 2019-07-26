'use strict';

const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

exports.get = async () => {
  const response = await Customer.find({}, 'name email roles');

  return response;
}

exports.authenticate = async data => {
  
  const response = await Customer.findOne({
    email: data.email,
    password: data.password
  });

  return response;
}

exports.getById = async id => {
  
  const response = await Customer.findById(id);

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
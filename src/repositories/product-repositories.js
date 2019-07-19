'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = async () => {
  const response = await Product.find({ active: true }, 'name manufacturerName image line petType description racePorte race age amount indication use slug type howToUse benefits smell materialType tags date');

  return response;
}

exports.getBySlug = async slug => {
  const response = Product.findOne({ slug: slug, active: true }, 'name image manufacturerName line petType description racePorte race age amount indication use slug type howToUse benefits smell materialType tags date');

  return response;
}

exports.getById = async id => {
  const response = Product.findById(id);

  return response;
}

exports.getByTag = async tag => {

  const response = Product.find({ tags: tag, active: true }, 'name image manufacturerName line petType description racePorte race age amount indication use slug type howToUse benefits smell materialType tags date active');

  return response;
}

exports.create = async data => {
  let product = new Product(data);
  
  await product.save();
}

exports.update = async (id, data) => {
  await Product.findByIdAndUpdate(id, {
    $set: {
      name: data.name,
      slug: data.slug,
      manufacturerName: data.manufacturerName,
      line: data.line,
      petType: data.petType,
      description: data.description,
      racePorte: data.racePorte,
      race: data.race,
      age: data.age,
      amount: data.amount,
      indication: data.indication,
      use: data.use,
      type: data.type,
      howToUse: data.howToUse,
      benefits: data.benefits,
      smell: data.smell,
      materialType: data.materialType,
      active: data.active,
      imageURL: data.imageURL,
      tags: data.tags
    }
  });
}

exports.remove = async id => {
  await Product.findOneAndRemove({_id: id});
}
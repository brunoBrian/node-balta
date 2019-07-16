'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = () => {
  return Product.find({ active: true }, 'name manufacturerName image line petType description racePorte race age amount indication use slug type howToUse benefits smell materialType tags date');
}

exports.getBySlug = slug => {
  return Product.findOne({ slug: slug, active: true }, 'name image manufacturerName line petType description racePorte race age amount indication use slug type howToUse benefits smell materialType tags date');
}

exports.getById = id => {
  return Product.findById(id);
}

exports.getByTag = tag => {
  return Product.find({ tags: tag, active: true }, 'name image manufacturerName line petType description racePorte race age amount indication use slug type howToUse benefits smell materialType tags date');
}

exports.create = data => {
  var product = new Product(data);
  return product.save();
}

exports.update = (id, data) => {
  return Product.findByIdAndUpdate(id, {
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

exports.remove = id => {
  return Product.findOneAndRemove(id);
}
const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
  name: String,
  parent: {
    type: mongoose.Types.ObjectId,
    ref: 'Category'
  }
})

module.exports = mongoose.model('Category', CategorySchema)

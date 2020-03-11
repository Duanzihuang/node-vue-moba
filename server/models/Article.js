const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
    categories: [{type: mongoose.Types.ObjectId,ref: 'Category'}],
    title: String,
    body: String
})

module.exports = mongoose.model('Article',articleSchema)
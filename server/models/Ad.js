const mongoose = require('mongoose')

const adSchema = new mongoose.Schema({
    name: String,
    items: [{
        image: String,
        url: String
    }]
})

module.exports = mongoose.model('Ad',adSchema)
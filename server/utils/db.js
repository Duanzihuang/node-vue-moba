const mongoose = require('mongoose')

module.exports = async app => {
  await mongoose.connect('mongodb://39.108.131.40:27017/node-vue-moba', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
}

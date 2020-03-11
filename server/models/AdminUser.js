const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const adminUserSchema = new mongoose.Schema({
    username: String,
    password: {
        type: String,
        select: false,
        set(val) {
            return bcrypt.hashSync(val,10)
        }
    }
})

module.exports = mongoose.model('AdminUser',adminUserSchema)
const mongoose = require('../database/index');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    username: {
        unique: true,
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    admin: {
        type: Boolean,
        default: false,
        select: false
    }
})

UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
})

const User = mongoose.model('User', UserSchema);

module.exports = User;


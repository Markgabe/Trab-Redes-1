const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

module.exports = {
    async login(req, res) {
        const {username, password} = req.body;

        const user = await User.findOne({username}).select('+password');

        if (!user)
            res.sendStatus(400).send({error: 'User not found'})


        if (await !bcrypt.compare(password, user.password)) 
            res.sendStatus(400).send({error: 'Invalid password.'})

        await jwt.sign({user}, 'secretKey', (err, token) => {
            res.json({token})
        })
    },

    async register(req, res) {
        const { username } = req.body;

        try {

            if (await User.findOne({ username }))
                return res.sendStatus(400).send({error: 'User already exists'});

            const user = await User.create(req.body);

            user.password = undefined;
            user.admin = undefined;

            return res.send({user})
        } catch (err) {
            return res.status(400).send({error: 'Registration failed'})
        }
    }
};
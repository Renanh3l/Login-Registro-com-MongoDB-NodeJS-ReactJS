const express = require('express');
const users = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
users.use(cors());

process.env.SECRET_KEY = 'segredo';

users.post('/register', (req, res) => {
    const today = new Date();
    const userData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        createdAt: today
    }
    
    User.findOne({email: req.body.email}).then(user => {
        if (!user) {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                userData.password = hash
                User.create(userData).then(user => {
                    res.json({status: user.email + ' registrado!'});
                }).catch(err => {
                    res.status(400).send({error: 'Erro no cadastro.'});
                })
            })
        } else {
            res.status(400).send({error: 'Endereço de e-mail já cadastrado'})
        }
    }).catch(err => {
        res.status(400).send({error: err});
    })
})

users.post('/login', (req, res) => {
    User.findOne({email: req.body.email}).then(user => {
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                const payload = {
                    _id: user._id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email
                }
                let token = jwt.sign(payload, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })

                res.send(token);
            } else {
                res.status(400).send({error: 'Senha incorreta'})
            }
        } else {
            res.status(400).send({error: 'Usuário não existe'})
        }
    }).catch(err => {
        res.status(400).send({error: err});
    })
})

users.get('/profile', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);

    User.findOne({
        _id: decoded._id
    }).then(user => {
        if (user) {
            res.json(user)
        } else {
            res.status(401).send('Usuário não existe')
        }
    }).catch(err => {
        res.status(400).send('error: ' + err);
    })
})

module.exports = users;

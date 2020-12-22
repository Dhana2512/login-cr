'use strict';
const express = require('express');
const { v4: uuid } = require('uuid');
const mongoose = require('mongoose');
const cors = require('cors')
mongoose.connect('mongodb://localhost:27017/sample', { useNewUrlParser: true, useUnifiedTopology: true });
const port = 3000;

const app = express();
app.use(cors())
app.use(express.urlencoded({ extends: true }))
app.use(express.json());
const user = mongoose.model('customer', {
    user_name: String,
    email: String,
    password: String,
    id: { type: String, default: uuid }
});

//create new user
app.post('/customers', (req, res) => {
    user.create(req.body)
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            res.status(500).json(error);
        });
});

//retrive the user list
app.get('/customers', (req, res) => {
    user.find({})
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            res.status(500).json(error);
        })
})

//update the user list
app.put('/customers/:id', (req, res) => {
    user.findOneAndUpdate({id: req.params.id }, req.body, { new: true})
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            res.status(500).json(error);
        })
})

//delete the user list
app.delete('/customers/:id', (req, res) => {
    user.findOneAndDelete({id: req.params.id })
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            res.status(500).json(error);
        })
})

app.listen(port, () => {
    console.log(`server listening at port ${port}`);
});
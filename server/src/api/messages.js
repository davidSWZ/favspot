const express = require('express');
const Joi = require('joi');
const router = express.Router();

const db = require('../db');
const messages = db.get('messages');

const schema = Joi.object({
    nameSpot: Joi.string()
        .min(1)
        .max(100)
        .required(),
    message: Joi.string()
        .min(1)
        .max(500)
        .required(),
    latitude: Joi.number()
        .min(-90)
        .max(90)
        .required(),
    longitude: Joi.number()
        .min(-180)
        .max(180)
        .required(),
})


router.get('/', (req, res) => {
  messages.find()
  .then(allMessages => {
    res.json(allMessages);
  })
});

router.post('/', (req, res) => {
  const result = Joi.validate(req.body, schema);
  if(result.error === null){
    const {nameSpot, message, latitude, longitude} = req.body;
    const newSpot = {
      nameSpot,
      message,
      latitude,
      longitude,
      date: new Date()
    }
    messages.insert(newSpot)
    .then(insertedMessage => {
      res.json(insertedMessage)
    })

  } else {
    res.send(result.error);
  }
});

module.exports = router;

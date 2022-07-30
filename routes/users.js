const express = require('express');
const router = express.Router();
const users = require('../services/users');


router.get('/', async function(req, res, next) {
  try {
    res.json(await users.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting users `, err.message);
    next(err);
  }
});



router.get('/:id', async function(req, res, next) {
  try {
    res.json(await users.getIndividual(req.params.id, req.query.page));
  } catch (err) {
    console.error(`Error while getting individual `, err.message);
    next(err);
  }
});


router.post('/', async function(req, res, next) {
  try {
    res.json(await users.create(req.body));
  } catch (err) {
    console.error(`Error while creating user`, err.message);
    next(err);
  }
});

module.exports = router;
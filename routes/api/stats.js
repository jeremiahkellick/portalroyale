const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Stat = require('../../models/Stat');
const validateStatsInput = require('../../validation/stat');



router.get('/test', (req, res) => res.json({ msg: 'Stats Works' }));


router.get(
    '/',
    (req, res) => {
      const errors = {};
      Stat.find()
        .limit(50)
        .sort({kills: -1})
        .then(lbs => res.json(lbs))
        .catch(err => res.status(404).json(err));
    }
  );
  
  router.get(
    '/:id',
    (req, res) => {
      Stat.findById(req.params.id)
        .then(stat => res.json(stat))
        .catch(err => res.json(err));
    }
  );
  
  router.post(
    '/',
    (req, res) => {
      const { errors, isValid } = validateStatsInput(req.body);
  
      // Check Validation
      if (!isValid) {
        // If any errors, send 400 with errors object
        return res.status(400).json(errors);
      }
      
      const stat = new Stat({
        name: req.body.name,
        kills: req.body.kills,
        damage_dealt: req.body.damage_dealt
      });
  
      stat.save().then(lb => res.json(lb));
    }
  );

module.exports = router;
var express = require('express');
var router = express.Router();

const Tutorial = require('../models/Tutorial');

router.post('/add', (req, res, next) => {

    const tutorialRequest = req.body;
    let tutorialDB;

    tutorialDB = new Tutorial();

    Object.assign(tutorialDB, {
        author: tutorialRequest.author,
        category_id: tutorialRequest.category_id,
        title: tutorialRequest.title,
        description: tutorialRequest.description,
        tags: tutorialRequest.tags
    });

    Tutorial.create(tutorialDB).then(([rows]) => {
        res.status(201).json(tutorialDB);
      })
      .catch(err => {
        console.error(err);
        let status = 400;
        if (err != null && err.errorInfo != null && err.errorInfo.code == 'auth/email-already-exists')
          status = 409;
        res.status(status).json({
          message: err.errorInfo.message
        });
      });

});

module.exports = router;
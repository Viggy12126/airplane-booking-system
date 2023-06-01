const express = require('express');


const { CityController } = require('../../controllers');

const router = express.Router();

router.post('/',CityController.createCity);

module.exports=router;
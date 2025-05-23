import express from 'express';
//import ControllerCampeonatos from '../controllers/ControllerCampeonatos.js';
import {salvaTime, buscaTimes } from '../services/firebaseServices.js';

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (req.get('api_key') == 'interCampeao') {
    buscaTimes()
    .then((times) => {
      console.log(times);
      res.json(times);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
  } else {
    res.send(401);
  }
});


router.post('/', function(req, res, next) {
  try {
    let body = req.body;
    console.log(body)
    salvaTime(body);
    res.send(201);
  } 
  catch(error){
    console.log(error)
    res.status(error.codigoStatus).send(error.message);
  };
  
});

export default router;

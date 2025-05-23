import express from 'express';
import ControllerCampeonatos from '../controllers/ControllerCampeonatos.js';
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (req.get('api_key') == 'interCampeao') {
  res.json(
    ControllerCampeonatos.buscarTodosCampeonantos()
  );
  } else {
    res.send(401);
  }
});


router.post('/', function(req, res, next) {
  try {
    let body = req.body;
    console.log(body)
    ControllerCampeonatos.inserirCampeonato(body.usuario, body.campeonato);  
    res.send(201);
  } 
  catch(error){
    console.log(error)
    res.status(error.codigoStatus).send(error.message);
  };
  
});

export default router;

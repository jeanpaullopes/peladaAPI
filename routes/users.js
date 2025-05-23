import express from 'express';
import firebaseServices from '../services/firebaseServices.js';
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function(req, res, next) {
  firebaseServices.loginEmailSenha(
    req.body.email,
    req.body.senha)
    .then((user) => {
      console.log(user);
      res.status(200).send(user);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);

});
}
);
export default router;
import express from 'express';
import firebaseServices from '../services/firebaseServices.js';
import { JWTSecret } from '../services/firebaseCredeiciais.js';
import { SignJWT, jwtVerify } from 'jose';
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let token = req.get( 'Authorization' );
  if (!token) {
    res.status(401).send('Não autorizado, token não informado');
    return;
  }
  token = token.split(' ')[1];
  if (!token) {
    res.status(498).send('Não autorizado, token inválido');
    return;
  }
  jwtVerify(token, JWTSecret, { algorithms: ['HS256'] })
  .then((payload) =>{
    res.send(payload);
  })
  .catch((error) => {
    console.log(error);
    if (error.code == 'ERR_JWT_EXPIRED') {
      res.status(498).send("Token expirado " + error.code);
    } else {
      res.status(498).send("Token inválido " + error.code);
    }
    return;
  });
  
});

router.post('/login', function(req, res, next) {
  firebaseServices.loginEmailSenha(
    req.body.email,
    req.body.senha)
    .then((user) => {
      console.log(user);
    let payload={
      user: 'Sei lá quem é',
      email: user.email,
      nivelAcesso: 'Pica das galaxias'
    };

    new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setSubject('Login Way dia '+new Date())
    .setJti('123')
    .setExpirationTime('60s')
    .sign(JWTSecret)
    .then( (token) => {
      res.status(200).send(token);
    })
    .catch((error) => {
      console.log(error);
    });
  




      
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);

});
}
);
export default router;
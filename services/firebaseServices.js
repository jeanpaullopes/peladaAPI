import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword,
    signInWithEmailAndPassword } 
from "firebase/auth";
import { getFirestore, setDoc, doc, collection, getDocs } from "firebase/firestore";

import { firebaseConfig } from "./firebaseCredeiciais.js";
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

const firebaseServices = {

    criaUsuarioEmailSenha: (email, senha, 
                            funcaoCallback, 
                            funcaoQuandoErro) => {
     
        createUserWithEmailAndPassword(auth, email, senha)
  .then((userCredential) => {
    // Signed up 
    console.log('User created successfully');
    console.log(userCredential);
    const user = userCredential.user;
    funcaoCallback(user);
    // ...
  })
  .catch((error) => {
    console.error(error);
    const errorCode = error.code;
    const errorMessage = error.message;
    funcaoQuandoErro(errorCode, errorMessage);
    // ..
  });



    },
    loginEmailSenha: (email, senha) => {
        return new Promise((resolve, reject) => {
            signInWithEmailAndPassword(auth, email, senha)
            .then((userCredential) => {
                resolve(userCredential.user);
            })
            .catch((error) => {
                reject(error.message);
            });
        })
    }
}

export default firebaseServices;

export function salvaTime(time) {
  const docRef = doc(collection(db, "times"));
  setDoc(docRef, time)
    .then((volta) => {
      console.log(volta);
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}

export function buscaTimes() {
  return new Promise(
    (resolve, reject) => {
      getDocs(collection(db, "times"))
      .then((querySnapshot) => {
          const retorno = new Array();
          querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          let temp = doc.data();
          temp.id = doc.id;
          retorno.push( temp);
        });
        resolve(retorno);
      })
      .catch((error) => {
        reject(error);
      });
    }
  );



  
}




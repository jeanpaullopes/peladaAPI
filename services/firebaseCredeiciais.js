// Your web app's Firebase configuration
import { createSecretKey } from 'crypto';

export const firebaseConfig = {
  apiKey: "AIzaSyAUub_Ml-JhmdmmjVBOdEwECaGszNWU1FA",
  authDomain: "oincrivelprojetodapaeladaapi.firebaseapp.com",
  projectId: "oincrivelprojetodapaeladaapi",
  storageBucket: "oincrivelprojetodapaeladaapi.firebasestorage.app",
  messagingSenderId: "812274976282",
  appId: "1:812274976282:web:a40ce7ee47fe9b433873a3"
};

const secret = "nosso segredinho"
export let JWTSecret = createSecretKey(secret, 'utf-8')


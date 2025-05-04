//Importações das funções do SDK do Firebase para inicialização e uso do FireStore.
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";

// Configuração do Firebase com o uso de variáveis.
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
}

const app = initializeApp(firebaseConfig); //Inicializa o app do Firebase com a configuração fornecida
const db = getFirestore(app); // Pega a instância do Firestore associada ao app

export { db,  collection, addDoc, onSnapshot, query, orderBy}; // Exportação do banco de dados e funcões que serão uteis para manipular e ouvir as atualizações.

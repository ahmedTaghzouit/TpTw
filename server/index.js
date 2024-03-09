
import express from "express";
import morgan from "morgan";
import dotenv from 'dotenv'
import { upload } from "./middlware/upload.js";
import cors from 'cors'
import cookieParser from 'cookie-parser';
import Auth from './middlware/Auth.js';
import methodes from "./controller/controller.js";
const corsOption = {
    origin: ['http://localhost:3000'],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}

dotenv.config({ path: '.env' });

const app = express();
app.use(cors(corsOption));
app.use(express.json())
app.use(morgan('tiny'))
app.use(cookieParser());


//bouquet
app.post('/AddBouquets', upload.single("image"), methodes.addBouquet);
app.get('/AllBouquets', methodes.allBouquet);
app.get('/changeLike/:name',Auth,methodes.changeLike);
app.get('/getPrix/:name',Auth,methodes.getPrixBouquet);

//user
app .post('/register',methodes.register);
app .post('/login',methodes.login);

//fleur
app.post('/AddFleur', methodes.addFleur);
app.get('/AllFleur', methodes.allFleur);
app.get('/prixFleur/:name',Auth,methodes.getPrixFleur)
//BouquetFleur
app.post('/AddFleurBouquet',methodes.addFleurBouquet);
app.get('/FleurBouquet/:nameBouquet',methodes.getFleurBouquet)

//BouquetUser
app.get('/userBouquet',methodes.userBouquet)
app.get('/UserBouquetLike/:nameBouquet',Auth,methodes.getUserBouquetLike)
app.get('/creer',methodes.creer)
app.get('/numberLike/:nameBouquet',Auth,methodes.numberLike);


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Serveur écoutant sur le port ${PORT}`);
});




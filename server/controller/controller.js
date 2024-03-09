import Bouquet from '../modal/bouquets.js'
import User from "../modal/user.js";
import Fleur from "../modal/Fleur.js";
import Fleur_Bouquet from "../modal/Fleur_Bouquet.js";
import jwt from "jsonwebtoken";
import UserBouquet from '../modal/User_Bouquet.js'
import bcrypt from 'bcrypt'
const methodes = {
     addBouquet : async (req, res) => {
        try {
          await Bouquet.sync();
          const file = req.file;
          if (!file) {
            return res.status(400).send('Aucun fichier téléchargé.');
          }
      
          req.body.image = file.filename;
          const { name, desc, prix } = req.body;
          if (!name || !desc || !prix) {
            return res.status(204).json({ status: "failed", message: "Données invalides." });
          }
      
          const bouquet = await Bouquet.findOne({ where: { name } });
          if(bouquet){
            return res.status(400).json({ error: 'Bouquet exist deja.' });
          }
      
          const newBouquet = await Bouquet.create(req.body);
          return res.status(200).json("Succès");
        } catch (error) {
          return res.status(400).json({ error });
        }
      },
      
       allBouquet : async (req, res) => {
        try {
          const allBouquet = await Bouquet.findAll();
          res.json(allBouquet);
        } catch (error) {
          return res.status(400).json({ error });
        }
      },
      
       changeLike : async (req, res) => {
        try {
          //const email ='ahmed@gmail.com'
          const {email} = req.user
          const {name} = req.params;
          console.log(email)
      
          const userBouquet = await UserBouquet.findOne({
            where: { emailUser : email, nameBouquet : name },
          });
      
          userBouquet.isLiked = !userBouquet.isLiked;
          await userBouquet.save();
          return res.json({ userBouquet });
        } catch (error) {
          console.log(error);
          return res.status(500).json({ error: 'Erreur interne du serveur' });
        }
      },
      
      
      
       getPrixBouquet : async (req,res) =>{
       try {
        const {name} = req.params;
        const bouquet = await Bouquet.findOne({where : {name}});
        return res.status(200).json({prix:bouquet.prix});
       } catch (error) {
         console.log(error)
        return res.status(400).json({ error: error});
       }
      },
      
      
       register : async (req,res) =>{
        try {
          await User.sync();
          const { email, name, password } = req.body;
      
          // Vérifier si l'utilisateur existe déjà
          const existingUser = await User.findOne({ where: { email } });
          if (existingUser) {
            return res.status(400).json({ error: 'L\'utilisateur existe déjà.' });
          }
      
          // Hacher le mot de passe
          const hashedPassword = await bcrypt.hash(password, 10);
      
          // Créer un nouvel utilisateur
          const newUser = await User.create({ email, name, password: hashedPassword });
      
          return res.status(201).json({ message: 'Utilisateur enregistré avec succès.', user: newUser })
        } catch (error) {
          console.log("error is "+error)
          return res.status(400).json({error:"error de register"});
        }
      },
      
       login : async (req, res) => {
        try {
          await User.sync();
          const { email, password } = req.body;
      
          // ... vérification des informations d'identification ...
      
          const user = await User.findOne({ where: { email } });
          if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé.' });
          }
      
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
            return res.status(401).json({ error: 'Mot de passe incorrect.' });
          }
      
          const name = user.name;
          const token = jwt.sign({ email, name }, process.env.JWTSCRET, { expiresIn: '1d' });
      
          
          return res.status(200).json({ message: 'Connexion réussie.', user,token });
        } catch (error) {
          console.log(error);
          return res.status(400).json({ error });
        }
      },
      
      
      
      
      
       addFleur : async (req,res)=>{
        try {
      
          await Fleur.sync();
          const {name,description,prix} = req.body
      
          if(!name || !description || !prix ){
            return res.status(400).json({ error: 'incomplet data' });
          }
      
          const existFleur = await Fleur.findOne({ where: { name } });
          if(existFleur){
            return res.status(400).json({ error: 'fleur exist deja' });
          }
      
          const newFleur = await Fleur.create({ name,description,prix});
      
          return res.status(201).json({ message: 'fleur enregistré avec succès.', newFleur });
          
        } catch (error) {
          return res.status(400).json({error});
        }
      },
      
       allFleur : async (req,res)=>{
        try {
          const allFleur = await Fleur.findAll()
          return res.json(allFleur);
        } catch (error) {
          return res.status(400).json({error});
        }
      },
      
       getPrixFleur : async (req,res)=>{
        try {
          // const token = req.cookies.token
          // console.log(token);
          // if (!token) {
          //     return res.status(401).json({ error: 'Unauthorized no token exist' });
          //   }
      
          //   jwt.verify(token.split(' ')[1], process.env.JWTSCRET, (err, user) => {
          //     if (err) {
          //       return res.status(403).json({ error: 'Unauthorized Invalid token' ,err});
          //     }});
      
      
      
          const {name} = req.params;
          console.log(name);
          const fleur = await Fleur.findOne({where : {name}});
          return res.status(200).json({prix: fleur.prix});
        } catch (error) {
          console.log(error);
          return res.status(400).json({error});
        }
      },
      
       addFleurBouquet : async (req,res)=>{
        try {
          await Fleur_Bouquet.sync();
          const {nameBouquet , nameFleur , quantite} = req.body
          
          if(!nameBouquet || !nameFleur || !quantite){
            return res.status(401).json({ error: 'incomplet data' });
          }
      
           const bouquet = await Bouquet.findOne({ where: {name: nameBouquet} });
           
          if(!bouquet){
            return res.status(403).json({ message: 'Bouquet n exist pas' });
            
          }
          const fleur = await Fleur.findOne({ where: {name:nameFleur}});
          if(!fleur){
            return res.status(402).json({ message: 'Fleur n exist pas' });
          }
          const existeBouquetFleur = await Fleur_Bouquet.findOne({where:{nameBouquet:nameBouquet,nameFleur:nameFleur}});
          if(existeBouquetFleur){
            existeBouquetFleur.quantite = existeBouquetFleur.quantite + parseInt(quantite) ;
            existeBouquetFleur.save();
          }
          const newFleurBouquet = await Fleur_Bouquet.create({nameBouquet,nameFleur,quantite})
          bouquet.hasFleur = true;
          await bouquet.save();
          return res.status(200).json(newFleurBouquet,bouquet);
        } catch (error) {
          return res.status(400).json({error});
        }
      },
      
      getFleurBouquet : async (req,res)=>{
        try {
          const {nameBouquet} =req.params
          const allfleur = await Fleur_Bouquet.findAll({ where: {nameBouquet} });
          res.status(200).json(allfleur);
        }catch (error) {
          console.log(error)
          return res.status(400).json({error});
          
        }
      },
      
       getUserBouquetLike:async(req,res)=>{
      
        try {
         await UserBouquet.sync();
           const {email} = req.user
          const {nameBouquet} = req.params;
          console.log(email);
      
          const existUser = await UserBouquet.findOne({
            where: { nameBouquet : nameBouquet , emailUser : email},
          });
      
          if(!existUser){
           const userBouquet= await UserBouquet.create({
             nameBouquet:nameBouquet,
              emailUser : email,
              isLiked: false, 
            });
            return res.status(400).json({ userBouquet });
         
          }else
         
        return res.json({ userBouquet:existUser });
      } catch (error) {
        console.log(error);
        return res.status(400).json({error});
          
      }
      
      },
      
      
       userBouquet :async(req,res)=>{
      try {
      const allUserBouquet = await UserBouquet.findAll();
      res.status(200).json(allUserBouquet);
      } catch (error) {
        return res.status(400).json({error});
          
      }
      },
       numberLike : async(req,res)=>{
        try {
          const {nameBouquet} = req.params
          const like = await UserBouquet.count({ where: {nameBouquet : nameBouquet , isLiked : true} });
          console.log(like)
          res.status(200).json({like});
          } catch (error) {
            return res.status(400).json({error});
            
              
          }
      },
       creer : async(req,res)=>{
        try {
      
          await UserBouquet.sync();
      
          const userBouquet= await UserBouquet.create({
            nameBouquet:"TEST",
             emailUser : "TEST",
             isLiked: false, 
           });
           res.status(200).json({userBouquet})
        } catch (error) {
          res.status(400).json({error})
          console.log(error)
        }
      
      
      }



};
export default methodes;
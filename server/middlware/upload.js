import multer from "multer";

const storage= multer.diskStorage({    
    destination:(req,file,cb)=>{
        cb(null, 'C:/Users/ASUS/Desktop/code/TpTw/client/public/images');
    },
    filename:(req,file,cb)=>{
        cb(null, Date.now()+file.originalname)

}})

export const upload = multer({storage:storage});

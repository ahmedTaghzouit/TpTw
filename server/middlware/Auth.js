import jwt from "jsonwebtoken";

const Auth = (req,res,next)=>{

    
    const token = req.get('authorization');
    console.log(token)


    if (!token) {
        return res.status(401).json({ error: 'Unauthorized no token exist' });
      }

      jwt.verify(token.split(' ')[1], process.env.JWTSCRET, (err, user) => {
        if (err) {
          return res.status(403).json({ error: 'Unauthorized Invalid token' ,err});
        }
        req.user = user;
        next();
    }) 

}
export default Auth;
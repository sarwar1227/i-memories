const jwt = require('jsonwebtoken');

const auth = async(req,res,next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const isCustomAuth = token.length<500;
        
        let decodedData;

        if(isCustomAuth  && token){
            decodedData = jwt.verify(token,process.env.SECRET_KEY);
            req.userId = decodedData.id;
        }
        else{
            decodedData = jwt.decode(token);
            req.userId = decodedData.sub;
        }
    }catch(err){
        console.log(err);
    }
    next();
}

module.exports = auth;
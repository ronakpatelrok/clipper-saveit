const jwt = require('jsonwebtoken');
const JWT_SECRET = 'RonakisaGood%$Boy';

const fetchclipToken = (req, res, next) =>{
    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({error: "Please authenticate using valid token"});
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.clip = data.clip;
        next();
    } catch (error) {
        res.status(401).send({error: "Please authenticate using valid token"});
    }
}

module.exports = fetchclipToken;
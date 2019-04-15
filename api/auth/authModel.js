const jwt = require('jsonwebtoken');
const jwtKey = process.env.JWT_SECRET ;

authentication = (req, res, next) => {
  const token = req.get('Auth');
  if (token) { jwt.verify(token, jwtKey, (err, decoded) => {  // correct token
      if (err) return  // none or wrong token
        res.status(401).json({ errorMessage: 'No token returned', err });
        req.decoded = decoded;
        next();  // move on
    });
  } else {
    return res.status(401).json({ errorMessage: 'No token returned', err});
  }
}

module.exports = { authentication };

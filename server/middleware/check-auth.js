const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.JWT_KEY || 'SECRETKEY');

    req.userData = {
      email: decodedToken.email,
      id: decodedToken.id
    };
    next();
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Failed authenticate !'
    })
  }
}
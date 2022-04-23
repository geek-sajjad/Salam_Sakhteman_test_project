const User = require('../models/user');
const jwt = require('jsonwebtoken');
exports.loggedIn = (req, res, next) => {
  try {
    if (!req.headers.token)
      return res
        .status(400)
        .json({ message: 'token must be provided', status: 400 });
    const token = req.headers.token;
    const decoded = jwt.verify(token, process.env.JWT_TOKEN, {
      algorithm: 'HS256',
    });
    req.decoded = decoded;
    next();
  } catch (error) {
    if (error.message === 'invalid token')
      return res
        .status(401)
        .json({ message: 'token is not valid', status: 401 });
    next(error);
  }
};

exports.adminOnly = async (req, res, next) => {
  try {
    const user = await User.findById(req.decoded.userId);
    if (user.role === 'ADMIN') return next();
    res.status('401').json({ message: 'Access Denied', status: 401 });
  } catch (error) {
    next(error);
  }
};

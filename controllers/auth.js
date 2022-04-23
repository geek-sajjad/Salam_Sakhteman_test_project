const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.signup = async (req, res, next) => {
  const { email, password, name } = req.body;
  try {
    let user = await User.findOne({ email: email });
    if (user) {
      return res.status(409).json({ message: 'this email is alreay taken.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({
      email: email,
      password: hashedPassword,
      name: name,
    });

    const token = jwt.sign(
      {
        userId: user['_id'],
      },
      process.env.JWT_TOKEN,
      {
        algorithm: 'HS256',
        expiresIn: 60 * 60 * 24 * 7,
      }
    );
    res.status(200).json({
      name: user.name,
      email: user.email,
      id: user._id,
      token: token,
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.json({ message: 'email or password is incorrect!' });
    }
    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      return res.json({ message: 'email or password is incorrect!' });
    }
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_TOKEN,
      {
        algorithm: 'HS256',
        expiresIn: 60 * 60 * 24 * 7,
      }
    );
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: token,
    });
  } catch (error) {
    next(error);
  }
};

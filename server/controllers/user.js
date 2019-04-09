const User = require('../models/user');
const Log = require('../models/log');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');

exports.getAllUser = (req, res, next) => {
  User.find().then((users) => {
    res.send({
      status: true,
      data: users,
      message: 'Success retrieve user'
    })
  }).catch((error) => {
    res.send({
      status: false,
      data: null,
      message: error
    })
  })
}

exports.getOneUser = (req, res, next) => {
  User.findOne({
    _id: req.params.id
  }).then((dataUser) => {
    if (!dataUser) {
      return res.status(500).json({
        status: false,
        data: null,
        message: 'User not found'
      })
    }
    res.status(200).json({
      status: false,
      data: dataUser,
      message: 'Success retrieve one user'
    })
  }).catch((error) => {
    res.status(500).json({
      status: false,
      data: null,
      message: 'User not found'
    })
  })
}

exports.createUser = (req, res, next) => {
  let objUser = new User({
    username: req.body.username,
    email: req.body.email,
    image: req.body.image,
    password: bcrypt.hashSync(req.body.password, salt),
    registerData: new Date().getTime()
  })

  objUser.save().then((result) => {
    let log = new Log({
      userId: result._id 
    });

    log.save().then((resp) => {
      res.status(201).json({
        status: true,
        data: result,
        message: 'Success create user'
      });
    })
  }).catch((error) => {
    res.status(500).json({
      status: false,
      data: null,
      message: error
    })
  })
}

exports.updateUser = (req, res, next) => {
  User.findById(req.params.id).then((user) => {
    if (user) {
      let objUser = {
        username: req.body.username || user.username,
        email: req.body.email || user.email,
        password: req.body.password || user.password,
        image: req.body.image || user.image
      }
      User.updateOne({
        _id: req.params.id
      }, objUser).then((result) => {
        if (result.n < 1) {

        } else {
          res.status(200).json({
            status: true,
            data: result,
            message: 'Update Successful'
          })
        }
      })
    } else {
      res.send({
        status: false,
        data: null,
        message: 'No user found'
      })
    }
  })
}

exports.deleteUser = (req, res, next) => {
  User.deleteOne({
    _id: req.params.id
  }).then((result) => {
    if (result.n < 1) {
      res.status(500).json({
        status: false,
        data: result,
        message: 'Not authorized'
      })
    } else {
      res.status(200).json({
        status: true,
        data: req.params.id,
        message: 'Success delete data'
      })
    }
  }).catch((error) => {
    res.status(500).json({
      status: false,
      data: null,
      message: 'Delete failed'
    })
  })
}

exports.loginUser = (req, res, next) => {
  let user = null;

  User.findOne({
    email: req.body.email
  }).then((dataUser) => {
    if (!dataUser) {
      return res.status(500).json({
        status: false,
        data: null,
        message: 'No user found'
      })
    }
    user = dataUser;
    bcrypt.compare(req.body.password, dataUser.password).then((result) => {
      if (!result) {
        return res.status(500).json({
          status: false,
          data: null,
          message: 'Password not match'
        })
      }

      const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_KEY || 'SECRETKEY', { expiresIn: "1h" });
      
      return res.status(200).json({
        status: true,
        message: 'Login successful !',
        token: token,
        userId: user._id,
        expiresIn: 3600
      })
    }).catch((err) => {
      console.log(err);
      return res.status(500).json({
        status: false,
        data: null,
        message: 'User not found'
      });
    });
  });
}
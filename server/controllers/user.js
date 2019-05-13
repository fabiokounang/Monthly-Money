const User = require('../models/user');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(15);
const jwt = require('jsonwebtoken');

const transporter =  require('nodemailer').createTransport({
  service: 'Gmail',
  auth: {
    user: 'fabiokounang11@gmail.com',
    pass: 'faytleingod'
  }
});

let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

function requiredValidation (req, res, keyBody) {
  keyBody.forEach((key) => {
    if (!req.body[key]) {
      return res.send({
        status: false,
        data: [],
        error: 'error.' + key + '_required'
      })
    }
  })
}

exports.getAllUser = (req, res, next) => {
  User.getAllQuery().then((response) => {
    res.send(response[0]);
  }).catch((err) => {
    res.send(err);
  })
}

exports.registerUser = (req, res, next) => {
  let key = ['email', 'username', 'password', 'confirmation_password'];
  requiredValidation(req, res, key);
  if (req.body.password != req.body.confirmation_password) {
    return res.send({
      status: false,
      data: [],
      error: 'error.passwordmatch'
    })
  }

  if (!regexEmail.test(req.body.email)) {
    return res.send({
      status: false,
      data: [],
      error: 'error.emailnotvalid'
    })
  }

  if (req.body.password.length < 6) {
    return res.send({
      status: false,
      data: [],
      error: 'error.passwordlength'
    })
  }
  var hash = bcrypt.hashSync(req.body.password, salt);
  req.body.password = hash;

  User.registerQuery(req.body).then((response) => {
    res.send({
      status: true,
      data: [],
      error: ''
    });
  }).catch((err) => {
    let key = err.message.includes('email') ? 'email' : err.message.includes('username') ? 'username' : '';

    if (err.code == 'ER_DUP_ENTRY') {
      res.send({
        status: false,
        data: [],
        error: 'error.' + key + '_unique'
      })
    }
  })
}

exports.loginUser = (req, res, next) => {
  let key = ['email', 'password'];
  requiredValidation(req, res, key);
  
  if (!regexEmail.test(req.body.email)) {
    return res.send({
      status: false,
      data: [],
      error: 'error.emailnotvalid'
    })
  }

  User.findOneUser(req.body).then((dataUser) => {
    let user;
    if (dataUser) {
      if (dataUser[0].length > 0) {
        user = dataUser[0][0];

        bcrypt.compare(req.body.password, user.password).then((result) => {
          if (!result) {
            return res.send({
              status: false,
              data: [],
              error: 'error.passwordnotmatch'
            })
          }
          
          const token = jwt.sign({ id: user.id, email: user.email }, 'FEGGYWIGUNA', { expiresIn: "1h" });
          res.send({
            status: true,
            token: token,
            id: user.id,
            email: user.email,
            expiresIn: 3600
          })
        }).catch((err) => {
          res.send({
            status: false,
            data: [],
            error: 'error.bcrypt'
          })
        })
      } else {
        res.send({
          status: false,
          data: [],
          error: 'error.usernotfound'
        })
      }
    } else {
      res.send({
        status: false,
        data: [],
        error: 'error.noresponse'
      })
    }
  }).catch((err) => {
    res.send({
      status: false,
      data: [],
      error: 'error.api'
    });
  })
}

exports.forgotPassword = (req, res, next) => {
  if (req.body.email) {
    User.findOneUser(req.body).then((dataUser) => {
      if (dataUser) {
        if (dataUser[0].length > 0) {
          let mailOptions = {
            from: 'fabiokounang11@gmail.com', // sender address
            to: dataUser[0][0].email, // list of receivers
            subject: 'Forget Password', // Subject line
            html: `<h1>Hello World</h1>`
          }
          transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
              res.send({
                status: false, 
                data: [],
                error: 'error.nodemailer'
              })
            } else {
              res.send({
                status: true, 
                data: info,
                error: ''
              })
            }
          })
        } else {
          res.send({
            status: false,
            data: [],
            error: 'error.usernotfound'
          })
        }
      } else {
        res.send({
          status: false,
          data: [],
          error: 'error.noresponse'
        })
      }
    }).catch((err) => {
      res.send({
        status: false,
        data: [],
        error: 'error.api'
      });
    })
  } else {
    res.send({
      status : false, 
      data: [],
      error: 'error.email_required'
    });
  }
}
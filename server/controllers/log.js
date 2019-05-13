const Log = require('../models/log');

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

exports.getAllLogByUser = (req, res, next) => {
  if (req.params.id) {
    Log.getAllLogByUserQuery(req.params.id).then((response) => {
      res.send({
        status: true,
        data: response[0],
        error: ''
      });
    }).catch((err) => {
      res.send({
        status: false,
        data: [],
        error: 'error.api_log',
        err
      })  
    });
  }  else {
    res.send({
      status: false,
      data: [],
      error: 'error.user_id_not_found'
    })
  }
}

exports.postLog = (req, res, next) => {
  let key = ['userId', 'title', 'price'];
  requiredValidation(req, res, key);
  Log.postLog(req.body).then((response) => {
    res.send({
      status: true,
      data: [],
      error: ''
    })
  }).catch((err) => {
    res.send({
      status: false,
      data: [],
      error: 'error.api_post_log',
      err
    })
  })
}

exports.getAllTotalByType = (req, res, next) => {
  if (req.params.type) {
    Log.getAllTotalByTypeQuery(req.params.id, req.params.type).then((response) => {
      res.send({
        status: true,
        data: response[0],
        error: ''
      })
    }).catch((err) => {
      res.send({
        status: false,
        data: [],
        error: 'error.api_post_log',
        err
      })
    })
  }
}

exports.getAllTotalLogByCategories = (req, res, next) => {
  Log.getAllTotalLogByCategoriesQuery(req.params.id).then((response) => {
    res.send({
      status: true,
      data: response[0],
      error: ''
    })
  }).catch((err) => {
    res.send({
      status: false,
      data: [],
      error: 'error.api_get_log_by_category',
      err
    })
  })
}
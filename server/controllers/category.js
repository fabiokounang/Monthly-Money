const Category = require('../models/category');

exports.getAllCategoryByUser = (req, res, next) => {
  if (req.params.id) {
    Category.getAllByCategoryQuery(req.params.id).then((response) => {
      res.send({
        status: true,
        data: response[0],
        error: ''
      });
    }).catch((err) => {
      res.send({
        status: false,
        data: [],
        error: err
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

exports.postCategory = (req, res, next) => {
  if (req.body.name) {
    Category.postCategoryQuery(req.body).then((response) => {
      res.send({
        status: true,
        data: [],
        error: ''
      });
    }).catch((err) => {
      res.send({
        status: false,
        data: [],
        error: err
      })  
    });
  } else {
    res.send({
      status: false,
      data: [],
      error: 'error.name_required'
    })
  }
}
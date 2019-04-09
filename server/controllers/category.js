const Category = require('../models/category');

exports.getAllCategoryByUser = (req, res, next) => {
  Category.find({
    userId: req.userData.id
  }).then((categories) => {
    res.send({
      status: true,
      data: categories,
      message: 'Success retrieve categories'
    })
  }).catch((error) => {
    res.send({
      status: false,
      data: null,
      message: error
    })
  })
}

exports.addCategory = (req, res, next) => {
  let objCategory = new Category({
    userId: req.userData.id,
    name: req.body.name
  })
  objCategory.save().then((result) => {
    res.status(201).json({
      status: true,
      data: result,
      message: 'Success create category'
    });
  }).catch((error) => {
    res.status(500).json({
      status: false,
      data: null,
      message: error
    })
  })
}

exports.editCategory = (req, res, next) => {

}

exports.deleteCategory = (req, res, next) => {

}
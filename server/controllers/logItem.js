const LogItem = require('../models/logItem');

exports.getAllLogItem = (req, res, next) => {
  Log.find().then((logs) => {
    res.send({
      status: true,
      data: logs,
      message: 'Success retrieve logs'
    })
  }).catch((error) => {
    res.send({
      status: false,
      data: null,
      message: error
    })
  })
}

exports.getOneLogItem = (req, res, next) => {
  Log.findOne({
    _id: req.params.id
  }).then((dataLog) => {
    if (!dataLog) {
      return res.status(500).json({
        status: false,
        data: null,
        message: 'Log not found'
      })
    }
    res.status(200).json({
      status: false,
      data: dataLog,
      message: 'Success retrieve one log'
    })
  }).catch((error) => {
    res.status(500).json({
      status: false,
      data: null,
      message: 'Log not found'
    })
  })
}

exports.createLogItem = (req, res, next) => {
  let objLogItem = new LogItem({
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category || '1'
  })
  objLogItem.save().then((result) => {
    res.status(201).json({
      status: true,
      data: result,
      message: 'Success create log item'
    });
  }).catch((error) => {
    res.status(500).json({
      status: false,
      data: null,
      message: error
    })
  })
}

exports.updateLogItem = (req, res, next) => {
  Log.findById(req.params.id).then((log) => {
    if (log) {
      let objLogItem = {
        Logname: req.body.Logname || log.Logname,
        email: req.body.email || log.email,
        password: req.body.password || log.password,
        image: req.body.image || log.image
      }
      Log.updateOne({
        _id: req.params.id
      }, objLog).then((result) => {
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
        message: 'No log found'
      })
    }
  })
}

exports.deleteLogItem = (req, res, next) => {
  Log.deleteOne({
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
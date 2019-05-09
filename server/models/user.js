const db = require('../util/database');

class User {
  static getAllQuery () {
    return db.execute('SELECT * FROM master_user');
  }

  static findOneUser (data) {
    return db.execute(`SELECT * FROM master_user WHERE email = "${data.email}"`);
  }

  static registerQuery (data) {
    return db.execute(`INSERT INTO master_user (email, username, password) VALUES ("${data.email}", "${data.username}", "${data.password}")`);
  }

  static loginQuery (data) {
    return db.execute('IN')
  }
}

module.exports = User;
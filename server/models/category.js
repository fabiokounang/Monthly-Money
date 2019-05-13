const db = require('../util/database');

class Log {
  static getAllByCategoryQuery (id) {
    return db.execute(`SELECT * FROM master_category WHERE userId = "${id}"`);
  }

  static postCategoryQuery (data) {
    return db.execute(`INSERT INTO master_category (name, userId) VALUES ("${data.name}", "${data.userId}")`);
  }
}

module.exports = Log;
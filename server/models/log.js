const db = require('../util/database');

class Log {
  static getAllLogByUserQuery (id) {
    return db.execute(`SELECT master_log.*, master_category.name FROM master_log JOIN master_category ON master_log.categoryId = master_category.id WHERE master_log.userId = ${id}`);
  }

  static postLog (data) {
    return db.execute(`INSERT INTO master_log (createdAt, categoryId, userId, type, title, price, description) VALUES ("${new Date().getTime()}", "${data.categoryId || '0'}", "${data.userId}", "${data.type || '0'}", "${data.title}", "${data.price}", "${data.description}")`);
  }

  static getAllTotalByTypeQuery (id, type) {
    if (type == 'all') {
      return db.execute(`SELECT SUM (price) FROM master_log WHERE userId = "${id}" GROUP BY type`);
    }

    if (type == 'income') {
      return db.execute(`SELECT SUM (price) FROM master_log WHERE userId = "${id}" AND type = "0"`);
    }

    if (type == 'spending') {
      return db.execute(`SELECT SUM (price) FROM master_log WHERE userId = "${id}" AND type = "1"`);
    }
  }

  static getAllTotalLogByCategoriesQuery (id) {
    return db.execute(`SELECT SUM (price), categoryId FROM master_log WHERE userId = "${id}" AND type = "1" GROUP BY categoryId`);
  }
}

module.exports = Log;
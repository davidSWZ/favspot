const monk = require("monk")
      db = monk(process.env.DATABASEURL);

module.exports = db;

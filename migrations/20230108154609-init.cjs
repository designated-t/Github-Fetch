'use strict';

var dbm;
var type;
var seed;
var fs = require('fs').promises;
var path = require('path');
var Promise;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
  Promise = options.Promise;
};

'use strict';

var dbm;
var type;
var seed;
var fs = require('fs').promises;
var path = require('path');
var Promise;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
  Promise = options.Promise;
};

exports.up = async function (db) {
  try {
    const filePath = path.join(__dirname, 'sqls', '20230108154609-init-up.sql');
    const data = await fs.readFile(filePath, { encoding: 'utf-8' });
    return await db.runSql(data);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

exports.down = async function (db) {
  try {
    const filePath = path.join(__dirname, 'sqls', '20230108154609-init-down.sql');
    const data = await fs.readFile(filePath, { encoding: 'utf-8' });
    return await db.runSql(data);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

exports._meta = {
  "version": 1
};


exports._meta = {
  "version": 1
};

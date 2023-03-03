'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.insert('users',['id', 'name', 'email', 'about', 'created_at'], ['390SJte3AshKfDwcpt-h_', 'testingUser', 'test@email.com', 'testInfo', '2022-12-02 13:22:28.190885'])
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};

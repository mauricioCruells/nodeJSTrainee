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
  return db.createTable('posts',{
    id: { 
      type: 'string', 
      primaryKey: true,
      unique: true 
    },
    user_id: {
      type: 'string',
      primaryKey: true,
      foreignKey: {
        name: 'posts_user_id_fkey',
        table: 'users',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },
    author: 'string',
    title: 'string',
    content: 'text',
    created_at: 'timestamp'
  });
};

exports.down = function(db) {
  return db.dropTable('posts');
};

exports._meta = {
  "version": 1
};

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
  return db.createTable('comments',{
    id: { 
      type: 'string', 
      primaryKey: true,
    },
    post_id:{
      type: 'string',
      primaryKey: true,
      foreignKey: {
        name: 'comments_post_id_fkey',
        table: 'posts',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      } 
    },
    user_id: {
      type: 'string',
      primaryKey: true,
      foreignKey: {
        name: 'comments_user_id_fkey',
        table: 'users',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT' 
        },
        mapping: 'id' 
      } 
    },
    comment: 'text',
    likes: {
      type: 'int',
      unsigned: true
    },
    created_at: 'timestamp'
  });
};

exports.down = function(db) {
  return db.dropTable('comments');
};

exports._meta = {
  "version": 1
};

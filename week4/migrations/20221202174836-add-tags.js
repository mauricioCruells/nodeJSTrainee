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
  return db.createTable('tags',{
    post_id: { 
      type: 'string', 
      primaryKey: true,
      foreignKey: {
        name: 'tags_post_id_fkey',
        table: 'posts',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      } 
    },
    tags: 'string',
  });
};

exports.down = function(db) {
  return db.dropTable('tags');
};

exports._meta = {
  "version": 1
};

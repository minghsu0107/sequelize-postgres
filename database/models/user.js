'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      defaultValue: 'ming@ming.io',
      unique: true,
      validate: {
        isEmail: true
      }
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Post, {
      foreignKey: 'userId',
      as: 'posts',
      onDelete: 'CASCADE',
    });

    User.hasMany(models.Comment, {
      foreignKey: 'userId',
      as: 'comments',
      onDelete: 'CASCADE',
    });
  };
  return User;
};
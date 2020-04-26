# Sequelize and PostgreSQL
[![Build Status](https://travis-ci.com/minghsu0107/sequelize-postgres.svg?branch=master)](https://travis-ci.com/minghsu0107/sequelize-postgres)
[![Coverage Status](https://coveralls.io/repos/github/minghsu0107/sequelize-postgres/badge.svg?branch=master)](https://coveralls.io/github/minghsu0107/sequelize-postgres?branch=master)
## Prepare DB
First, create `.sequelizerc` and `.env`.

Second, run:
```
npx sequelize init
```
Then, edit `database/config/config.js`.

Next, create db (should have Postgres installed):
```
createdb nodedb -U <db-user>
createdb nodedbtest -U <db-user>
```
## Creating Models and Migrations
```
npx sequelize model:generate --name User --attributes name:string,email:string

npx sequelize model:generate --name Post --attributes title:string,content:text,userId:integer

npx sequelize model:generate --name Comment --attributes postId:integer,comment:text,userId:integer
```
Note, ensure there's no space between --attributes definition.

Next up, we need to make a few changes on the migrations. We need to add `NOT NULL` constraints to the FOREIGN_KEY attributes (userId, postId).

Next, edit `database/models/index.js` and model definitions.

Finally, make migrations:
```
npx sequelize db:migrate
```
## Seeding data to the database
```
sequelize seed:generate --name User

sequelize seed:generate --name Post

sequelize seed:generate --name Comment
```
The commands above will generate three files `xxxx-User.js`, `xxxx-Post.js`, and `xxxx-Comment.js` for User, Post and Comment models respectively.

Next, edit seed files.

Finally, run the command below to seed the database:
```
npx sequelize db:seed:all
```

We can check the development db:
```
SELECT * FROM "Users";
SELECT * FROM "Posts";
SELECT * FROM "Comments";
```
## Woops! Forgot a something...
Let's pretend you have jammed out 50 new commits while working with your newly created Users table, and realize that you forgot to add in an `bio` column to the table! Don't worry, this is not a problem.
```
sequelize migration:create --name add-bio-to-user
```
`migrations/add-bio-to-user.js`:
```javascript
'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
```
After filling in the `up` and `down` functions, your migration file looks like this:
```javascript
'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn( 'Users', 'bio', Sequelize.TEXT );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn( 'Users', 'bio' );
  }
};
```
It's important to always have both `up` and `down` methods in your migration script. Every time you run `sequelize db:migrate` it will call the `up` method. And if you ever want to revert backwards, you can call `sequelize db:migrate:undo` which will call the down method. They should always be opposite actions, this allows you to safely run migrations and know that the state of the database will be intact.

Now that you fixed your migrations, you need to update your model to reflect the changes.
`models/user.js`:
```javascript
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
    bio: DataTypes.TEXT
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
```
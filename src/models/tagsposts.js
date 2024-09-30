'use strict';

const {
  Model
} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class TagsPosts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Posts.belongsToMany(models.Tags, { through: TagsPosts, foreignKey: 'post_id' });
      models.Tags.belongsToMany(models.Posts, { through: TagsPosts, foreignKey: 'tag_id' });
    }
  }
  TagsPosts.init({
    post_id:{
      type: DataTypes.INTEGER,
      references: {
        model: 'Posts',
        key: 'id',
      },
    } ,
    tag_id:{
      type: DataTypes.INTEGER,
      references: {
        model: 'Tags',
        key: 'id',
      },
    } 
  }, {
    sequelize,
    modelName: 'TagsPosts',
  });
  return TagsPosts;
};
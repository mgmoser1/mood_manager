module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    mood: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true,
      len: [1, 1500]
    }
  });

  Post.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Post.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Post;
};

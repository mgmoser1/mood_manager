module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // eslint-disable-next-line camelcase
    login_key: DataTypes.INTEGER,
    name: DataTypes.TEXT
  });
  return User;
};

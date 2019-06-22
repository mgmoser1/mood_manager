module.exports = function(sequelize, DataTypes) {
  var Example = sequelize.define("Example", {
    description: DataTypes.TEXT,
    mood: {
      type: DataTypes.INTEGER,
      defaultValue: 3,
      validate: {
        len: {
          args: [1, 5],
          msg:
            "Mood value should be between 1 and 5, where 5 is feeling amazing."
        }
      }
    }
  });
  return Example;
};

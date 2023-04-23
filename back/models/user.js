const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        // id is included by default.
        email: {
          type: DataTypes.STRING(30), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
          allowNull: false, // required
          unique: true,
        },
        nickname: {
          type: DataTypes.STRING(30),
          allowNull: false, // required
        },
        password: {
          type: DataTypes.STRING(100),
          allowNull: false, // required
        },
      },
      {
        modelName: 'User',
        tableName: 'users',
        charset: 'utf8',
        collate: 'utf8_general_ci', // allow Korean char
        sequelize,
      }
    );
  }
  static associate(db) {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Report);
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' });
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'FollowingId' });
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'FollowerId' });
  }
};

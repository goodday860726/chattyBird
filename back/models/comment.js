const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Comment extends Model {
  static init(sequelize) {
    return super.init(
      {
        // id is included by default.
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        // UserId: 1
        // PostId: 3
      },
      {
        modelName: 'Comment',
        tableName: 'comments',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci', // save emoji
        sequelize,
      }
    );
  }

  static associate(db) {
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post);
  }
};

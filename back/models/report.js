const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Report extends Model {
  static init(sequelize) {
    return super.init(
      {
        // id is included by default.
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        modelName: 'Report',
        tableName: 'reports',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Report.belongsTo(db.User);
    db.Report.belongsTo(db.Post);
  }
};

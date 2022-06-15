const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class databusinessdev extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  databusinessdev.init(
    {
      id_kategori: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      kategori: {
        type: DataTypes.STRING,
      },
      nama_partnership: {
        type: DataTypes.STRING,
      },
    },
    {
      // options
      sequelize,
      modelName: "databusinessdev",
      tableName: "data_bisdev",
      //   createdAt: "date_created",
      //   updatedAt: "date_updated",
      underscore: true,
      timestamps: false,
    }
  );
  return databusinessdev;
};

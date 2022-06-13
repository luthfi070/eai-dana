const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class datamarketing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  datamarketing.init(
    {
      id_barang: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      nama_barang: {
        type: DataTypes.STRING,
      },
      kategori_barang: {
        type: DataTypes.STRING,
      },
    },
    {
      // options
      sequelize,
      modelName: "datamarketing",
      tableName: "data_marketing",
      //   createdAt: "date_created",
      //   updatedAt: "date_updated",
      underscore: true,
      timestamps: false,
    }
  );
  return datamarketing;
};

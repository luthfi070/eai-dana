const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class datatransaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  datatransaksi.init(
    {
      id_transaksi: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      kategori: {
        type: DataTypes.STRING,
      },
      uang_keluar: {
        type: DataTypes.STRING,
      },
      uang_masuk: {
        type: DataTypes.STRING,
      },
      nama_user: {
        type: DataTypes.STRING,
      },
    },
    {
      // options
      sequelize,
      modelName: "datatransaksi",
      tableName: "data_transaksi",
      //   createdAt: "date_created",
      //   updatedAt: "date_updated",
      underscore: true,
      timestamps: false,
    }
  );
  return datatransaksi;
};

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class datapayment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  datapayment.init(
    {
      id_pembayaran: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      nama_akun: {
        type: DataTypes.STRING,
      },
      nomer_hp: {
        type: DataTypes.STRING,
      },
      kategori: {
        type: DataTypes.STRING,
      },
      total_harga: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING,
      },
      nama_barang: {
        type: DataTypes.STRING,
      },
    },
    {
      // options
      sequelize,
      modelName: "datapayment",
      tableName: "data_payment",
      //   createdAt: "date_created",
      //   updatedAt: "date_updated",
      underscore: true,
      timestamps: false,
    }
  );
  return datapayment;
};

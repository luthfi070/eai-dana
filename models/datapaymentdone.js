const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class datapaymentdone extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  datapaymentdone.init(
    {
      id_pembayaran_done: {
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
      id_pembayaran: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING,
      },
      kategori_barang: {
        type: DataTypes.STRING,
      },
      nama_barang: {
        type: DataTypes.STRING,
      },
    },
    {
      // options
      sequelize,
      modelName: "datapaymentdone",
      tableName: "data_payment_done",
      //   createdAt: "date_created",
      //   updatedAt: "date_updated",
      underscore: true,
      timestamps: false,
    }
  );
  return datapaymentdone;
};

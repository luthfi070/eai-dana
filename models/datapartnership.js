const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class datapartnership extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  datapartnership.init(
    {
      id_partnership: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      nama_partnership: {
        type: DataTypes.STRING,
      },
      kategori_barang: {
        type: DataTypes.STRING,
      },
      perusahaan: {
        type: DataTypes.STRING,
      },
    },
    {
      // options
      sequelize,
      modelName: "datapartnership",
      tableName: "data_partnership",
      //   createdAt: "date_created",
      //   updatedAt: "date_updated",
      underscore: true,
      timestamps: false,
    }
  );
  return datapartnership;
};

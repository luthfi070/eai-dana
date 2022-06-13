const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class datauser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  datauser.init(
    {
      id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      nama_user: {
        type: DataTypes.STRING,
      },
      nomer_telepon: {
        type: DataTypes.STRING,
      },
      dana_shopee: {
        type: DataTypes.STRING,
      },
    },
    {
      // options
      sequelize,
      modelName: "datauser",
      tableName: "data_user",
      //   createdAt: "date_created",
      //   updatedAt: "date_updated",
      underscore: true,
      timestamps: false,
    }
  );
  return datauser;
};

export const model = (sequelize: any, DataTypes: any) => {
  sequelize.define(
    "Orders",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      clicks: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { updatedAt: false, timestamps: false }
  );
};

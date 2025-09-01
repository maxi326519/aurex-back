export const model = (sequelize: any, DataTypes: any) => {
  sequelize.define(
    "Receptions",
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
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.ENUM(
          "Pendiente",
          "Recibido",
          "Pickeado",
          "En revisión",
          "Completado"
        ),
        allowNull: false,
      },
    },
    { updatedAt: false, timestamps: false }
  );
};

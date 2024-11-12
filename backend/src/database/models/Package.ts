import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({

  tableName: "packages",
  modelName: "Package",
  timestamps: true,
})
class Package extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare name: string;
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare description: string;
}
export default Package;

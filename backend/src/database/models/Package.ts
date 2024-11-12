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
    type: DataType.STRING,
    allowNull: false,
  })
  declare packageName: string;
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare description: string;
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare price: number;
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare duration: number;
}
export default Package;

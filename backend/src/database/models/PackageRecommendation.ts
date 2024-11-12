import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({

  tableName: "packageRecommendations",
  modelName: "PackageRecommendation",
  timestamps: true,
})
class PackageWorkout extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;
 
}
export default PackageWorkout;

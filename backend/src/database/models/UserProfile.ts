import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({

  tableName: "userProfiles",
  modelName: "UserProfile",
  timestamps: true,
})
class UserProfile extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare age: number;
  @Column({
    type: DataType.ENUM("male", "female"),
    allowNull: true,
  })
  declare gender: string;
  @Column({
    type: DataType.ENUM("beginner", "intermediate", "advanced"),
    allowNull: true,
  })
  declare fitness_level: string;
  @Column({
    type: DataType.ENUM("low", "moderate", "high"),
    allowNull: true,
  })
  declare activity_level: string;
  @Column({
    type: DataType.ENUM("weight_loss", "muscle_gain", "general_fitness"),
    allowNull: true,
  })
  declare goal: string;
  
  
}
export default UserProfile;

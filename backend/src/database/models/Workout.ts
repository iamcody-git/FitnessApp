import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({

  tableName: "workouts",
  modelName: "Workout",
  timestamps: true,
})
class Workout extends Model {
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
  declare workoutName: string;
  @Column({
    type: DataType.ENUM("cardio", "strength", "flexibility"),
    allowNull: false,
  })
  declare type: string;
  @Column({
    type: DataType.ENUM("beginner", "intermediate", "advanced"),
    allowNull: false,
  })
  declare level: string;
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare description: string;
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      min: 1, 
    },
  })
  declare duration: number;
}
export default Workout;

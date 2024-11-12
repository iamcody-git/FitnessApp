import { Sequelize } from "sequelize-typescript";
import User from "./models/User";
import PackageRecommendation from "./models/PackageRecommendation";
import Package from "./models/Package";
import Workout from "./models/Workout";
import UserProfile from "./models/UserProfile";

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  dialect: "mysql",
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  username: process.env.DB_USERNAME,
  port: Number(process.env.DB_PORT),
  models: [__dirname + "/models"],
});
sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to database");
    console.log("Database:", process.env.DB_NAME);
  })
  .catch((err) => {
    console.error("Unable to connect to database:", err);
  });
//we have to make force true if we want to migrate and again change to false
sequelize.sync({ force: false}).then(() => {
  console.log("Database synced");
});

// Relationship between User and UserProfile
User.hasOne(UserProfile, { foreignKey: 'userId' });
UserProfile.belongsTo(User, { foreignKey: 'userId' });

//relation between user-and workout
User.hasMany(Workout, { foreignKey: 'userId' }); 
Workout.belongsTo(User, { foreignKey: 'userId' });

// Relationship between User and PackageRecommendations
User.hasMany(PackageRecommendation, { foreignKey: "userId" });
PackageRecommendation.belongsTo(User, { foreignKey: "userId" });

// Relationship between Package and PackageRecommendations
Package.hasMany(PackageRecommendation, { foreignKey: "packageId" });
PackageRecommendation.belongsTo(Package, { foreignKey: "packageId" });

//package and workout relation
Package.hasMany(Workout, { foreignKey: 'packageId' });
Workout.belongsTo(Package, { foreignKey: 'packageId' });



export default sequelize;

import { Request, Response } from "express";
import UserProfile from "../database/models/UserProfile";
import { AuthRequest } from "../middleware/authMiddleWare";
import User from "../database/models/User";
import { getRecommendedPackage } from "../algorithm/kMeansHelper";
import Package from "../database/models/Package";
import PackageRecommendation from "../database/models/PackageRecommendation";

class userProfileController {
  public static async createUserProfile(
    req: AuthRequest,
    res: Response
  ): Promise<void> {
    const userId = req.user?.id;
    const { age, gender, fitness_level, activity_level, goal } = req.body;

    if (!age || !gender || !fitness_level || !activity_level || !goal) {
      res.status(400).json({
        message:
          "Please enter age, gender, fitness_level, activity_level, goal",
      });
      return;
    }

    // Convert user profile data to numeric values for clustering
    const genderValue = gender === "male" ? 1 : 2;
    const fitnessLevelValue =
      fitness_level === "beginner"
        ? 1
        : fitness_level === "intermediate"
        ? 2
        : 3;
    const activityLevelValue =
      activity_level === "low" ? 1 : activity_level === "moderate" ? 2 : 3;
    const goalValue =
      goal === "weight_loss"
        ? 1
        : goal === "strength"
        ? 2
        : goal === "endurance"
        ? 3
        : 4;

    // Create the user profile
    await UserProfile.create({
      age,
      gender,
      fitness_level,
      activity_level,
      goal,
      userId,
    });

    // Prepare user data vector for recommendation
    const userProfileVector = [
      fitnessLevelValue,
      activityLevelValue,
      goalValue,
      genderValue,
    ];

    // Get the recommended package
    const recommendedPackage = getRecommendedPackage(userProfileVector); // returns "Basic", "Gold", or "Platinum"
    console.log("Recommended Package:", recommendedPackage); // Log to verify output

    // Fetch the packages from the database
    const packages = await Package.findAll();
    const packageNameToIdMap: { [key: string]: string } = {}; // Map packageName (string) to id (string)

    // Log packages to ensure they're being fetched correctly
    console.log("Packages from DB:", packages);

    // Populate the packageNameToIdMap with packageName and id from each package in the database
    packages.forEach((pkg) => {
      const packageName = pkg.dataValues.packageName;
      const packageId = pkg.dataValues.id;
      if (packageName && packageId) {
        packageNameToIdMap[packageName.toLowerCase()] = packageId; // Normalize to lowercase for case-insensitivity
      }
    });

    // Log the populated map
    console.log("Package Name to ID Map:", packageNameToIdMap);

    // Normalize the recommended package to lowercase for case-insensitive comparison
    const recommendedPackageNormalized = recommendedPackage.toLowerCase();
    const recommendedPackageId =
      packageNameToIdMap[recommendedPackageNormalized];

    // Log the recommended package ID
    console.log("Recommended Package ID:", recommendedPackageId);

    if (!recommendedPackageId) {
      res.status(500).json({
        message: "Could not find the recommended package ID",
      });
      return;
    }

    // Save recommendation to the database
    await PackageRecommendation.create({
      userId,
      packageId: recommendedPackageId,
    });

    res.status(200).json({
      message: "UserProfile created successfully",
      recommendedPackage,
    });
  }

  public static async getAllUserProfile(
    req: Request,
    res: Response
  ): Promise<void> {
    const data = await UserProfile.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "email"],
        },
      ],
    });
    res.status(200).json({
      message: "user fetched successfully",
      data,
    });
  }

  public static async getOneUser(
    req: AuthRequest,
    res: Response
  ): Promise<void> {
    const id = req.params.id;
    const data = await UserProfile.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: User,
          attributes: ["id", "email", "username"],
        },
    
      ],
    });
    if (!data) {
      res.status(404).json({
        message: "User not found",
      });
    } else {
      res.status(200).json({
        message: "user fetched successfully",
        data,
      });
    }
  }
}
export default userProfileController;

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
    const recommendedPackage = getRecommendedPackage(userProfileVector);

    // Fetch the packages from the database
    const packages = await Package.findAll();
    const packageNameToIdMap: { [key: string]: string } = {};

    packages.forEach((pkg) => {
      const packageName = pkg.dataValues.packageName;
      const packageId = pkg.dataValues.id;
      if (packageName && packageId) {
        packageNameToIdMap[packageName.toLowerCase()] = packageId;
      }
    });

    const recommendedPackageNormalized = recommendedPackage.toLowerCase();
    const recommendedPackageId =
      packageNameToIdMap[recommendedPackageNormalized];

    if (!recommendedPackageId) {
      res.status(500).json({
        message: "Could not find the recommended package ID",
      });
      return;
    }

   
    await PackageRecommendation.create({
      userId,
      packageId: recommendedPackageId,
    });

    // Fetch the newly created UserProfile along with User data
    const userProfileWithUser = await UserProfile.findOne({
      where: { userId },
      include: [
        {
          model: User,
          attributes: ["id", "email"], // specify fields from User table
        },
      ],
    });

    // Send the created user profile data with associated user data in the response
    res.status(200).json({
      message: "UserProfile created successfully",
      userProfile: userProfileWithUser,
      recommendedPackage,
    });
  }

  public static async getAllUserProfile(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
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
    } catch (error) {
      console.error("Error fetching user profiles:", error);
      res.status(500).json({ message: "Error fetching user profiles", error });
    }
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

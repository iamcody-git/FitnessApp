import { Request, Response } from "express";
import UserProfile from "../database/models/UserProfile";
import { AuthRequest } from "../middleware/authMiddleWare";
import User from "../database/models/User";

class userProfileController{
  public static async createUserProfile(req: AuthRequest, res: Response): Promise<void> {
    const userId=req.user?.id
    console.log(userId)
   
      const { age,gender,fitness_level,activity_level,goal} = req.body;
      if (!age||!gender||!fitness_level||!activity_level||!goal) {
        res.status(400).json({
          message: "Please enter age,gender,fitness_level,activity_level,goal",
        });
        return;
      }
      await UserProfile.create({
      age,
      gender,
      fitness_level,
      activity_level,
      goal,
      userId:userId
      });
      res.status(200).json({
        message: "UserProfile created successfully",
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
          attributes: ["id", "email",],
        },
      ],
    });
    res.status(200).json({
      message: "user fetched successfully",
      data,
    });
  }

}

export default userProfileController;

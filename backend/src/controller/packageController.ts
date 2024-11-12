

import { Request, Response } from "express";
import Package from "../database/models/Package";

class packageController {
  packageData= [
    {
      
        "packageName": "Basic",
        "description": "The Basic package offers essential workouts for beginners focusing on overall health improvement. Ideal for those new to fitness who want to establish a foundation with basic routines and light exercises over a short duration.",
        "price": 29,
        "duration": 4
      },
      {
        
        "packageName": "Gold",
        "description": "The Gold package is designed for intermediate-level users looking to enhance fitness levels with moderate-intensity workouts. This package includes tailored workout plans that build endurance and strength over a longer period for noticeable improvements.",
        "price": 59,
        "duration": 8
      },
      {
        
        "packageName": "Platinum",
        "description": "The Platinum package is the ultimate fitness program, offering advanced-level, high-intensity workouts for optimal strength, flexibility, and endurance. It’s ideal for experienced fitness enthusiasts dedicated to achieving peak physical performance and maintaining a healthy lifestyle.",
        "price": 99,
        "duration": 12
      }
    
  ];
  async seedPackage(): Promise<void> {
    const data = await Package.findAll();
    if (data.length === 0) {
      const newCategory = await Package.bulkCreate(this.packageData);
      console.log("package created successfully");
    } else {
      console.log("package already added");
    }
  }
  async getAllPackage(req: Request, res: Response): Promise<void> {
    const data = await Package.findAll();
    if (data.length === 0) {
      res.status(404).json({
        message: "No package found",
      });
    } else {
      res.json({
        message: "package found successfully",
        data,
      });
    }
  }
 
}

export default new packageController();

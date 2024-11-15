import { authStatus } from "./status"

interface User {
    id:string,
    email:string,
    username:string
}
 export interface Workout{
    id:string,
    workoutName:string,
    type:string,
    level:string,
    duration:number,
    description:string,
    userId:string,
    packageId:string
}
 export interface Initialstate{
    status:authStatus
    workout:Workout[]
    singleWorkout:Workout|null
    
}
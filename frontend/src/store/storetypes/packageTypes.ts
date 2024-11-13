import { authStatus } from "./storeTypes"

export interface Package{
    id:string,
    packageName:string,
    description:string,
    price:string
}
export interface PackageState{
    packages:Package[],
    status:authStatus
}
import { authStatus } from "./status"

interface User {
    id:string,
    email:string,
    username:string
}
interface Category{
    id:string,
    categoryName:string
}

export interface Product{
    id:string,
    productName:string,
    description:string,
    price:number,
    productImageUrl:string,
    productQuantity:number,
    createdAt:string,
    updatedAt:string,
    categoryId:string,
    userId:string,
    User:User,
    Category:Category
}
export enum PaymentMethod{
    cod="cod",
    khalti="khalti"
}
export interface ItemDetails{
    productId:string,
    quantity:number

}
interface Payment{
    paymentMethod:PaymentMethod
}
export interface OrderData{
    phoneNumber:string
    shippingAddress:string,
    totalAmount:number,
    paymentDetails:Payment
    items:ItemDetails[]
}


 export interface Initialstate{
    products:Product[],
    users:User[],
    orders:OrderData[],
    status:authStatus

}
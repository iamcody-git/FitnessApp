export enum  authStatus{
    loading='loading',
    success='success',
    error='error'
}
export interface User {
    id:string,
    email:string,
    username:string
}
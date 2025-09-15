import { IUser } from "./users.interface";

export interface ILogin{
    email: string;
    password: string;
}

export interface IAuthResponse extends IUser{
    Id:number;
    Rol:string;
    Username:string;
    Message:string;
    token:string;
    Usuario: string;
}

export interface Auth{
    Token:string; 
}
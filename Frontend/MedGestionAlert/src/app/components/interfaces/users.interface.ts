import { IRol } from "./rols.interface";

export interface IUser{
id: number,
email: string,
userName: string,
rol: string,
passwordApp: string,
passwordApp2: string,
stateSession: string,
idRol: number,
}

export interface IUserResponse extends IUser{
    id:number;
    rol:string;
    userName:string;
    message:string;
    token:string;
    usuario: string;
  
  }
  
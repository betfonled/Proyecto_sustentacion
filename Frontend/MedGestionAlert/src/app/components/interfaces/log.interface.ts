export interface ILogError{
    id: number,
    fecha: Date,
    error: string,
    description: string,
  }

  export interface ILogErrorResponse extends ILogError{
    id:number;
    fecha:Date;
    error:string;
    description:string;
  }
export interface IOptionCheck{
    id: number ,
    optionName: string ,
    idFather: number,
    orderRol: string,
    children : number,
    check: boolean
}

export interface IOption{
    id: number ,
    optionName: string ,
    idFather: number
}
export interface PokemonStatus {
    name:string,
    StatusBase:{
        HP:number,
        Attack:number,
        Defense:number,
        SpAtk:number,
        SpDef:number,
        Speed:number	
    },
    // Este de ultimo
    infoThis:{
        HP:number,
        Attack:number,
        Defense:number,
        SpAtk:number,
        SpDef:number,
        Speed:number,
        Obj:string
    },
    targetObjects:[]
}
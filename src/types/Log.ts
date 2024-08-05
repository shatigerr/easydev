

type Log = {
    id:string,
    createdAt:Date,
    type:string,
    status:string,
    idUser:number,
    idProject:number,
    query:string,
    requestDuration:number
}

export default Log
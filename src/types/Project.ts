import Database from "./Database"
import Endpoint from "./Endpoint"
import Log from "./Log"

type Project = {
    id:string,
    createdAt:Date,
    title:string,
    description:string,
    key:string,
    idUser:string,
    idDB:string,
    endpoints: Endpoint[],
    iddatabaseNavigation:Database,
    logs:Log[]

}

export default Project
import Database from "./Database"
import Endpoint from "./Endpoint"

type Project = {
    id:string,
    createdAt:Date,
    title:string,
    description:string,
    key:string,
    idUser:string,
    idDB:string,
    endpoints: Endpoint[],
    iddatabaseNavigation:Database

}

export default Project
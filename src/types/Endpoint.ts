type Endpoint = {
    id:string,
    createdAt:Date,
    httpMethod: HttpMethod,
    url:string,
    query:string,
    params:string,
    idProject:string
}


type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

// "id": 2,
//       "createdAt": "2024-07-10T14:44:15.835Z",
//       "httpMethod": null,
//       "url": "string",
//       "query": "string",
//       "idProject": 1


export default Endpoint
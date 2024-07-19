import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
  
  
})
export class ApiService {

  constructor(private http:HttpClient) { }
  url ="http://localhost:5102/"
  //url ="https://localhost:7010/"  

  
  get<T>(url:string): Observable<T>{
    
    url = `${this.url}${url}`
    return this.http.get<T>(url);
  }

  post<T>(url:string,body:Object): Observable<T>{
    url = `${this.url}${url}`
    return this.http.post<T>(url,body);
  }

  delete<T>(url:string): Observable<T>{
    url = `${this.url}${url}`
    return this.http.delete<T>(url);
  }
}

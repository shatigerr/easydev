import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Endpoint from '../../../../types/Endpoint';
import { ApiService } from '../../services/api.service';
import Database from '../../../../types/Database';
import ApiResponse from '../../../../types/ApiResponse';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { CustomInputComponent } from '../custom-input/custom-input.component';

@Component({
  selector: 'app-endpoint',
  standalone: true,
  imports: [CommonModule,FormsModule,DialogModule,CustomInputComponent],
  templateUrl: './endpoint.component.html',
  styleUrl: './endpoint.component.css'
})
export class EndpointComponent implements OnInit {

  @Input() endpoint!:Endpoint;
  @Input() database!:Database;

  @Output() $endpoint = new EventEmitter<Endpoint>()

  visible:boolean=false;
  paramsObj: { [key: string]: string } = {};
  paramsArr:string[]= [];

  

  response!:any;
  css:string="";

  constructor(private apiService:ApiService){}

  ngOnInit(): void {
    this.css = this.httpMethod(this.endpoint.httpMethod)
    
    if(this.endpoint.params) this.paramsArr = this.endpoint.params.split(',')
    
    this.paramsObj = this.paramsArr.reduce((acc, param) => {
      acc[param.trim()] = this.paramsObj[param.trim()]; // Usa el valor del input
        return acc;
      }, {} as { [key: string]: string } );
  }

  onDelete(){
    this.apiService.delete(`api/Endpoint/${this.endpoint.id}`).subscribe(res => console.log(res))
  }

  httpMethod(method: string): string{
    let css : string="";
    switch(method)
    {
      case "GET":
        css = "bg-succes text-white"
        break;
      case "POST":
        css = "bg-post text-white"
        break;
      case "DELETE":
        css = "bg-delete text-white"
        break;
      case "PUT":
        css = "bg-put text-white"
        break;
    }
    return css;
  }

  onProcess(){
    this.endpoint.params = ""
    
    for (let obj in this.paramsObj) {
      
      
      if(obj.includes(":int"))
      {
        this.endpoint.params += `${this.paramsObj[obj]},`    
      }else{
        this.endpoint.params += `'${this.paramsObj[obj]}',`    
      }
    }
    
    this.endpoint.params = this.endpoint.params.substring(0,this.endpoint.params.length-1)

    this.apiService.post("api/Request",{
      database:this.database,
      query:this.endpoint.query,
      params:this.endpoint.params
    }).subscribe(res => {
      try {
        if(typeof(res) == 'number')
        {
         this.response = [{"rowsAffected":res}] 
        }else{
          this.response = res;
        }
            
        console.log(this.response);
        
      } catch (e) {
        console.error("Error parsing JSON response:", e);
        this.response = []; // O cualquier valor por defecto que desees
      }
    })
    
  }
  getKeys(obj: ApiResponse): string[] {
    return Object.keys(obj);
  }

  onSubmit($event:Event){

  }
}

import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import Project from '../../../../types/Project';
import { EndpointComponent } from '../../UI/endpoint/endpoint.component';
import Endpoint from '../../../../types/Endpoint';
import Database from '../../../../types/Database';
import { DialogModule } from 'primeng/dialog';
import { FormGroup,FormControl } from '@angular/forms';
import { CustomInputComponent } from '../../UI/custom-input/custom-input.component';


@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [EndpointComponent,DialogModule,CustomInputComponent],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css'
})
export class ProjectDetailsComponent implements OnInit {


  project!: Project;
  @Input() endpoint!:Endpoint;
  css = ""
  response!:string

  visible:boolean=false

  endpointForm = new FormGroup({
    httpMethod:new FormControl(""),
    url:new FormControl(""),
    query:new FormControl(""),
    idProject:new FormControl(""),
    params:new FormControl("")
  })

  constructor(private apiService: ApiService, private route:ActivatedRoute){}

  ngOnInit(): void {
    let id;

    this.route.params.subscribe(params => {
      id = params["projectid"];
    })

    this.apiService.get<Project>(`api/Project/details/${id}`).subscribe(res => {
      
      this.project = res;
      console.log(this.project);
      
    });

    
    
  }

  onSubmit($event:Event){
    $event.preventDefault()
    this.apiService.post<Endpoint>("api/Endpoint/",{
      httpMethod: this.endpointForm.value.httpMethod,
      url: this.endpointForm.value.url,
      query: this.endpointForm.value.query,
      idProject: this.endpointForm.value.idProject,
      params: this.endpointForm.value.params
    })
    .subscribe(res => {
      this.visible=false
      this.project.endpoints.push(res)
      
    })
  }


  onEvent($event:Endpoint){
    this.project.endpoints = this.project.endpoints.filter(e => e.id != $event.id)
  }


 

}

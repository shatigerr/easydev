import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import Project from '../../../../types/Project';
import { EndpointComponent } from '../../UI/endpoint/endpoint.component';
import Endpoint from '../../../../types/Endpoint';
import Database from '../../../../types/Database';
import { DialogModule } from 'primeng/dialog';
import { FormGroup,FormControl, ReactiveFormsModule } from '@angular/forms';
import { CustomInputComponent } from '../../UI/custom-input/custom-input.component';
import { CommonModule } from '@angular/common';
import { BarChartComponent } from '../../UI/bar-chart/bar-chart.component';
import ApiResponse from '../../../../types/ApiResponse';
import Chart from '../../../../types/Chart';


@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [EndpointComponent,DialogModule,CustomInputComponent,ReactiveFormsModule,CommonModule,BarChartComponent],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css'
})
export class ProjectDetailsComponent implements OnInit {


  project!: Project;
  @Input() endpoint!:Endpoint;
  css = ""
  response!:string

  visible:boolean=false

  endpointsCard: boolean = true;
  dbCard:boolean = false
  chartCard:boolean = true

  httpMethodChart:Chart = {labels:[],data:[]}
  statusChart:Chart = {labels:[],data:[]}

  endpointForm = new FormGroup({
    httpMethod:new FormControl("GET"),
    url:new FormControl(""),
    query:new FormControl(""),
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
      
      
      let httpMethodData = this.getChartDataAndLabels(this.project.logs, 'type');
      let statusData = this.getChartDataAndLabels(this.project.logs, 'status');

      this.httpMethodChart = { labels: httpMethodData.labels, data: httpMethodData.data };
      this.statusChart = { labels: statusData.labels, data: statusData.data };
      
      
    });

    

    
    
  }

  getChartDataAndLabels(group:Array<ApiResponse>,by:string){
    let grouped = this.groupBy(group,by)
    let labels = []
    let data = []
      for (const key in grouped) {
        data.push(grouped[key].length)
        labels.push(key)  
      }

    return {
      data:data,
      labels:labels
    }
    
  }

  groupBy(group:Array<ApiResponse>, by:string){
    let grouped = group.reduce((result,current) => {
      let cuerrentValue = current[by];
      if(!result[cuerrentValue])result[cuerrentValue] = []

      result[cuerrentValue].push(current)
      return result
    },{})

    return grouped
  }

  onSubmit($event:Event){
    $event.preventDefault()
    this.apiService.post<Endpoint>("api/Endpoint/",{
      httpMethod: this.endpointForm.value.httpMethod,
      url: this.endpointForm.value.url,
      query: this.endpointForm.value.query,
      idProject: this.project.id,
      params: this.endpointForm.value.params
    })
    .subscribe(res => {
      this.visible=false
      this.project.endpoints.push(res)
      this.endpointForm.reset(this.endpointForm.value)
    })
  }


  onEvent($event:Endpoint){
    this.project.endpoints = this.project.endpoints.filter(e => e.id != $event.id)
  }

  handleEndpointCard(){
    this.endpointsCard = !this.endpointsCard;
  }

  handleDBCard(){
    this.dbCard = !this.dbCard
  }

  handleChartCard(){
    this.chartCard = !this.chartCard
  }

 

}

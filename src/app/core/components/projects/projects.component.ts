import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import Project from '../../../../types/Project';
import { ProjectCardComponent } from '../../UI/project-card/project-card.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { CustomInputComponent } from "../../UI/custom-input/custom-input.component";
import { FormControl, FormGroup } from '@angular/forms';
import Database from '../../../../types/Database';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ProjectCardComponent, DialogModule, ButtonModule, InputTextModule, AvatarModule, CommonModule, CustomInputComponent,CustomInputComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {

  projects: Project[] = []
  visible: boolean = false;

  projectForm = new FormGroup({
    projectName:new FormControl(""),
    projectDescription:new FormControl(""),
    dbHost:new FormControl(""),
    dbName:new FormControl(""),
    dbPort:new FormControl(""),
    dbUser:new FormControl(""),
    dbPassword:new FormControl("")
  })

  constructor(private apiService: ApiService){}

  ngOnInit(): void {
    let userId = localStorage.getItem("user");
    this.apiService.get<Project[]>(`api/Project/${userId}`)
    .subscribe(res => {
      
      this.projects = res;
      console.log(this.projects);
    })
  }

  onSubmit(e:Event){
    let idDb = ""
    let idUser;

    e.preventDefault();

    this.apiService.post<Database>("api/Database/",{
      host:this.projectForm.value.dbHost,
      dbEngine:"PostgreSQL",
      password:this.projectForm.value.dbPassword,
      user:this.projectForm.value.dbUser,
      database1:this.projectForm.value.dbName,
      port:this.projectForm.value.dbPort
    }).subscribe(res => {

      console.log(res);
      idUser = localStorage.getItem("user")
      
      this.apiService.post<Project>("api/Project/",{
        title:this.projectForm.value.projectName,
        description:this.projectForm.value.projectDescription,
        idUser:idUser,
        iddatabase:res.id
      }).subscribe(res => console.log(res))
  
    })

    
    

    
    

    
  }

  showDialog() {
    this.visible = true;
    console.log("hola");
    
  }
}

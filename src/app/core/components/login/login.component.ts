import { Component, OnInit } from '@angular/core';
import { CustomInputComponent } from '../../UI/custom-input/custom-input.component';
import { ApiService } from '../../services/api.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import User from '../../../../types/User';
import { NotificationComponent } from '../../UI/notification/notification.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CustomInputComponent,ReactiveFormsModule,FormsModule,NotificationComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  noti!: string;

  loginForm = new FormGroup({
    mail: new FormControl(""),
    password: new FormControl("")
  })
  constructor(private apiService:ApiService, private router: Router,private route:ActivatedRoute){}

  ngOnInit(): void {
    
    

    
  }

  onSubmit(){

    this.apiService.post<User>("api/User",{
      email: this.loginForm.value.mail,
      password: this.loginForm.value.password
    }).subscribe(res=> {
      try{
        localStorage.setItem("user",res.id)
        this.router.navigate(["/projects/"+res.id])
      }catch{
        console.log("ERROR");
        
      }
      
      
    })
  }

}

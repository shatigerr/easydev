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

  noti!: string | null;
  notiText!:string;
  loginForm = new FormGroup({
    mail: new FormControl(""),
    password: new FormControl("")
  })
  constructor(private apiService:ApiService, private router: Router,private route:ActivatedRoute){}

  ngOnInit(): void {
    
    this.noti = this.route.snapshot.queryParamMap.get('noti');
    this.notiText = this.route.snapshot.queryParamMap.get('msg') ?? "";
    if(this.notiText=="1")
    {
      this.notiText = "Account successfully created, Activate your account!!";
    }else if(this.notiText=="2")
    {
      this.notiText="Account Activated";
    }
    

    
  }

  onSubmit(){
    this.noti = null;
    this.apiService.post<User>("api/User",{
      email: this.loginForm.value.mail,
      password: this.loginForm.value.password
    }).subscribe({
      next: (value) => {  
        localStorage.setItem("user",value.id)
        this.router.navigate(["/projects/"+value.id])
                 
      },
      error:(err) => {
        console.log(err["error"]);
        this.noti = err["error"].noti
        this.noti?.toString()
        this.notiText = err["error"].message
      }
      })}

}

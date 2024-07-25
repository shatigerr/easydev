import { Component } from '@angular/core';
import { CustomInputComponent } from '../../UI/custom-input/custom-input.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule,FormGroup,FormControl } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { NotificationComponent } from '../../UI/notification/notification.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CustomInputComponent,CommonModule,FormsModule,ReactiveFormsModule,NotificationComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  signupForm =  new FormGroup({
    email: new FormControl(""),
    username: new FormControl(""),
    password: new FormControl(""),
    confirmPassword: new FormControl("")
  })

  notiParam!:string;
  constructor(private apiService:ApiService,private router:Router ){}
  
  onSubmit()
  {

    if(this.signupForm.value.password === this.signupForm.value.confirmPassword){

      this.apiService.post("api/User/create",{
        mail: this.signupForm.value.email,
        name: this.signupForm.value.username,
        password: this.signupForm.value.password
      }).subscribe(value => {
        this.router.navigateByUrl("/login?noti=1")
      }) 
    }else{
      this.notiParam = "2"
    }
  }
}

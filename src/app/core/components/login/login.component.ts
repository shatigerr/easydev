import { Component } from '@angular/core';
import { CustomInputComponent } from '../../UI/custom-input/custom-input.component';
import { ApiService } from '../../services/api.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import User from '../../../../types/User';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CustomInputComponent,ReactiveFormsModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm = new FormGroup({
    mail: new FormControl(""),
    password: new FormControl("")
  })
  constructor(private apiService:ApiService, private router: Router){}

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

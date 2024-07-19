import { Component } from '@angular/core';
import { CustomInputComponent } from '../../UI/custom-input/custom-input.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule,FormGroup,FormControl } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CustomInputComponent,CommonModule,FormsModule,ReactiveFormsModule],
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
  constructor(private apiService:ApiService ){}
  
  onSubmit()
  {

    if(this.signupForm.value.password === this.signupForm.value.confirmPassword){

      this.apiService.post("api/User/create",{
        mail: this.signupForm.value.email,
        name: this.signupForm.value.username,
        password: this.signupForm.value.password
      }).subscribe(value => console.log(value))
      
    }
  }
}

import { Component,Input, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationComponent } from '../../UI/notification/notification.component';

@Component({
  selector: 'app-account-activation',
  standalone: true,
  imports: [NotificationComponent],
  templateUrl: './account-activation.component.html',
  styleUrl: './account-activation.component.css'
})
export class AccountActivationComponent implements OnInit {
  constructor(private apiService:ApiService,private route:ActivatedRoute,private router:Router){}

  mail!:string
  param!:string;
  text!:string;
  ngOnInit(): void {
    this.mail =  this.route.snapshot.queryParamMap.get("mail") ?? "";
    if(!this.mail){
      this.router.navigate(["/login"])
    }
  }

  activateAccount(){
    this.apiService.put(`api/User?mail=${this.mail}`,{}).subscribe({
      next: (value) => {
        this.router.navigateByUrl("/login?noti=1&msg=2");
      },
      error: (err) => {
        this.param="2";
        this.text="Error ocured activating the account try again"
      }
    })
  }

}

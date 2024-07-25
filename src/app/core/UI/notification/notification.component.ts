import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit {
  
  @Input() param?:string;
  text!:string;
  color!:string;
  icon!:string;
  noti?:string="";
  visible:boolean = false;

  constructor(private route:ActivatedRoute){}

  ngOnInit(): void {
    this.noti =  this.route.snapshot.queryParamMap.get("noti") ?? this.param;
    if(this.noti){
      this.getMessage(this.noti);
      if(this.text) this.visible=true;
      
    }
  }
  
  close()
  {
    this.visible = false
  }

  getMessage(param:string)
  {
    switch(param){
      case "1":
        this.text = "Account successfully created"
        this.color = "bg-succes"
        this.icon = "fa-solid fa-check"
        break;
      case "2":
        this.text = "Password doesn't match"
        this.color = "bg-delete"
        this.icon = "fa-solid fa-x"
        break;
      case "3":
        this.text = "Project successfully created!"
        this.color = "bg-succes"
        this.icon = "fa-solid fa-check"
        break;   
    }
  }
}

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
  
  @Input() param!:string;
  @Input() text!:string;
  color!:string;
  icon!:string;
  visible:boolean = false;

  constructor(private route:ActivatedRoute){}

  ngOnInit(): void {
    this.getMessage(this.param)
  }
  
  close()
  {
    this.visible = false
  }

  getMessage(param:string)
  {
    switch(param){
      case "1":
        this.color = "bg-succes"
        this.icon = "fa-solid fa-check"
        break;
      case "2":
        this.color = "bg-delete"
        this.icon = "fa-solid fa-x"
        break;
    }
  }
}

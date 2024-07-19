import { Component, Input } from '@angular/core';
import { ReactiveFormsModule,FormControl,FormGroup, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './custom-input.component.html',
  styleUrl: './custom-input.component.css'
})
export class CustomInputComponent {
  
  @Input() type = "text";
  @Input() placeHolder = "";
  @Input() icon = "";
  @Input() control = new FormControl();
}

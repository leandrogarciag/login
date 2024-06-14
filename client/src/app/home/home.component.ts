import { Component } from '@angular/core';
import { LogingService } from '../loging.service';
import { FormControl, FormGroup, ReactiveFormsModule,FormBuilder } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
     
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  applyForm: FormGroup;

 
  constructor(public logingService: LogingService, public fb: FormBuilder) {
    this.applyForm = this.fb.group({
      userName: [''],
      password: ['']
    });
  }
  
  loginData() {
    const { userName, password } = this.applyForm.value;
    console.log('userName',userName);
    
    this.logingService.processData(userName ?? '', password ?? '')
      .subscribe((resp) => {
        console.log('resp', resp);
      });
  }
 
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{
  userdata!: FormGroup;

  constructor(private fb: FormBuilder){}

  

  ngOnInit(){
    this.fetchUserData();
}

fetchUserData(){
  this.userdata=this.fb.group({
    name: ['',Validators.required],
    workout_type: ['',Validators.required],
    workout_minutes: ['',Validators.required]
  });
 
}




onSubmit() {
  if (this.userdata.valid) {
    Swal.fire({
      icon: 'success',
      title: 'Added Successfully',
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      // Save data AFTER the alert is closed
      console.log("DATA", this.userdata.value);
      this.userdata.reset(); // Reset after saving
    });
  } else {
    let errorMessage = "Please fill in all required fields:\n";
    for (const controlName in this.userdata.controls) {
      const control = this.userdata.controls[controlName];
      if (control.invalid) {
        errorMessage += `- ${controlName}\n`;
      }
    }
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: errorMessage,
    });
  }
}




}

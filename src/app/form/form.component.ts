import { Component } from '@angular/core';
import { NgForm, FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  // firstName = new FormControl('')
  currentYear: number = new Date().getFullYear();
  startYear: number = 1920;


  years: number[] = Array.from({ length: this.currentYear - this.startYear + 1 }, (_, i) => this.currentYear - i);
  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  days: number[] = Array.from({ length: 31 }, (_, i) => i + 1);


  constructor(private fb: FormBuilder) { }

  registrationForm = this.fb.group({
    name: this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(4)]],
      middleName: [''],
      lastName: ['', Validators.required],
    }),
    email: ['', [Validators.required, Validators.email]],
    mobileNumber: ['', Validators.required],
    phoneNumber: [''],
    workNumber: [''],
    passwords: this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/)]],
      confirmPassword: ['', Validators.required],
    }, {
      validator: this.MustMatch('password', 'confirmPassword')
    }),
    date: this.fb.group({
      year: ['', Validators.required],
      month: ['', Validators.required],
      day: ['', Validators.required],
    }),

    gender: ['', Validators.required],
    positions: this.fb.array([this.fb.control('')]),
    address: this.fb.group({
      street: [''],
      street2: [''],
      city: [''],
      state: [''],
      zip: ['']
    })
  })

  get positions() {
    return this.registrationForm.controls.positions
  }

  // MustMatch(controlName: string, matchingControlName: string) {
  //   return (formGroup: FormGroup) => {
  //     const control = formGroup.controls[controlName]
  //     const matchingControl = formGroup.controls[matchingControlName]
  //     if (matchingControl.errors && !matchingControl.errors?.['mustMatch']) {
  //       return
  //     }

  //     if (control.value !== matchingControl.value) {
  //       matchingControl.setErrors({ mustMatch: true })
  //     } else {
  //       matchingControl.setErrors(null)
  //     }
  //   }
  // }
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (!control || !matchingControl) {
        return; // Return if either control is not defined
      }

      if (matchingControl.errors && !matchingControl.errors?.['mustMatch']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }


  onSubmit() {
    console.log(this.registrationForm.value)
    this.registrationForm.reset()
  }


  addPositions() {
    if (this.positions.length < 5) {
      this.positions.push(this.fb.control(''));
    }
  }



  submited: boolean = false;

  submitForm() {
    this.submited = true;
  }

  submitedClose() {
    this.submited = false
  }

}

import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-test-form',
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.scss']
})
export class TestFormComponent {

  form: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      passenger: new FormArray([
        new FormGroup({
          name: new FormControl(''),
          address: new FormControl(''),
          number: new FormControl(''),
          email: new FormControl('')
        })
      ])
    });

    console.log(this.form);
  }

  get passenger(): FormArray {
    return this.form.get('passenger') as FormArray;
  }

  addPassenger() {
    if (this.passenger.length < 5) {
      this.passenger.push(
        new FormGroup({
          name: new FormControl(''),
          address: new FormControl(''),
          number: new FormControl(''),
          email: new FormControl('')
        })
      );
    }

  }

  removePassenger() {
    this.passenger.removeAt(this.passenger.length - 1);
  }

  onSubmit() {
    console.log(this.form.value)
    this.form.reset()
  }
}

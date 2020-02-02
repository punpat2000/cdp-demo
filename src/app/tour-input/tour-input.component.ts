import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-tour-input',
  templateUrl: './tour-input.component.html',
  styleUrls: ['./tour-input.component.scss']
})
export class TourInputComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    //private customerService: CustomerService,
    //private afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
  }

}

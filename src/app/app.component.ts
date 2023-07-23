import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'registrationapp';
  registrationForm: FormGroup;

  constructor(
    private toaster: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.setFormState();
  }

  setFormState() {
    this.registrationForm = this.formBuilder.group({
      id: [0],
      title: ['', Validators.required],
      firstName: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ]),
      ],
      lastName: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ]),
      ],

      email: ['', Validators.compose([Validators.required, Validators.email])],
      dob: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(
            /^(?:0[1-9]|[12]\d|3[01])([\/.-])(?:0[1-9]|1[012])\1(?:19|20)\d\d$/
          ),
        ]),
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.required],
    });
  }
}

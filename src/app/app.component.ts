import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from './_helpers/user.service';
import { User } from './_helpers/user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'registrationapp';
  registrationForm: FormGroup;
  users: User[] = [];

  constructor(
    private _toaster: ToastrService,
    private _formBuilder: FormBuilder,
    private _userService: UserService
  ) {}

  ngOnInit() {
    this.setFormState();
    this.getAllUsers();
  }

  setFormState() {
    this.registrationForm = this._formBuilder.group({
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

  onSubmit() {
    if (this.registrationForm.invalid) return;
  }

  onCancel() {
    this.registrationForm.reset();
  }

  edit(userId: number) {
    alert(userId);
  }

  delete(userId: number) {
    this._userService.deleteUser(userId).subscribe((res) => {
      this.getAllUsers();
      this._toaster.success(`User with id:${userId} deleted successfully`, "User Registeration")
    });
  }

  getAllUsers() {
    this._userService.getUsers().subscribe((res: User[]) => {
      this.users = res;
    });
  }
}

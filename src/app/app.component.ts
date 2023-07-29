import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from './_helpers/user.service';
import { User } from './_helpers/user.interface';
import { DBOperation } from './_helpers/db-operations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'registrationapp';
  registrationForm: FormGroup;
  users: User[] = [];
  submitted: boolean = false;
  submitButtonText: string = 'Submit';
  dbOperations: DBOperation;

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
    this.submitButtonText = 'Submit';
    this.dbOperations = DBOperation.CREATE;
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
            /^(?:(?:0[1-9]|1[012])\/(?:0[1-9]|[12]\d|3[01])|(?:19|20)\d\d-[01]\d-[0-3]\d)$/
          ),
        ]),
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue],
    });
  }

  onSubmit() {
    console.log('submit');
    this.submitted = true;
    console.log(this.registrationForm.invalid);
    if (this.registrationForm.invalid) return;

    if (this.dbOperations) {
      if (DBOperation.CREATE) {
        console.log('create');
        this._userService
          .addUser(this.registrationForm.value)
          .subscribe((res) => {
            this._toaster.success('User Added!!', 'User Registration');
            this.getAllUsers();
            this.onCancel();
          });
      }
    } else if (DBOperation.UPDATE) {
      this._userService
        .updateUser(this.registrationForm.value)
        .subscribe((res) => {
          this._toaster.success('User Updated!!', 'User Registration');
          this.getAllUsers();
          this.onCancel();
        });
    }
  }

  get getFormControls() {
    return this.registrationForm.controls;
  }

  getAllUsers() {
    this._userService.getUsers().subscribe((res: User[]) => {
      this.users = res;
    });
  }

  onCancel() {
    this.registrationForm.reset();
    this.submitButtonText = 'Submit';
    this.dbOperations = DBOperation.CREATE;
    this.submitted = false;
  }

  edit(userId: number) {
    this.submitButtonText = 'Update';
    this.dbOperations = DBOperation.UPDATE;

    console.log(userId);
    console.log(this.users);
    let user = this.users.find(
      (currentUser: User) => currentUser.id === userId
    );
    console.log(user);

    this.registrationForm.patchValue(user);
  }

  delete(userId: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover deleted record',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes delete it',
      cancelButtonText: 'No keep it',
    }).then((result) => {
      if (result.value) {
        this._userService.deleteUser(userId).subscribe((res) => {
          this.getAllUsers();
        });
        Swal.fire(
          'Deleted',
          `User with id:${userId} deleted successfully`,
          'success'
        );
      } else if (result.dismiss == Swal.DismissReason.cancel) {
        Swal.fire('Cancel', 'Your record is not deleted', 'error');
      }
    });
  }
}

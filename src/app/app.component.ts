import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'registrationapp';

  constructor(private toaster: ToastrService) {}

  ngOnInit() {
    // this.toaster.success('saved successfully', 'User master');
    // Swal.fire('Hello World');
    // Swal.fire("oops..", "something went wrong", "error")
    // Swal.fire("Thanks", "Form saved", "success")
  }
}

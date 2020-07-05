import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Register } from '../register';
import { Observable } from 'rxjs';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  data = false;
  UserForm: FormGroup;
  massage: string;
  loading = false;
  submitted = false;
  constructor(private formbulider: FormBuilder, private loginService: LoginService) { }

  ngOnInit() {
    this.UserForm = this.formbulider.group({
      FirstName: ['', [Validators.required]],
      LastName: ['', [Validators.required]],
      WorkEmail: ['', [Validators.required]],
      Password: ['', [Validators.required]],
      Company: ['', [Validators.required]],
      Role: ['', [Validators.required]],
      Subscription: ['', [Validators.required]],
      Verification: ['', [Validators.required]],
    });
  }
  get f() { return this.UserForm.controls; }
  onFormSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.UserForm.invalid) {
      return;
    }

    this.loading = true;
    const user = this.UserForm.value;
    this.Createemployee(user);
  }
  Createemployee(register: Register) {
    this.submitted = false;
    this.loginService.CreateUser(register).subscribe(
      () => {
        this.data = true;
        this.massage = 'Data saved Successfully';
        this.UserForm.reset();
      });
  }
}

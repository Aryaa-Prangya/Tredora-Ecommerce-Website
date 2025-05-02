import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { cart, login, product, singUp } from '../data-type';
import { ProductService } from '../services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  signupForm: FormGroup;
  loginForm: FormGroup;
  showLogin = false;
  loginError = false;

  constructor(private fb: FormBuilder, private userService: UserService,private toastr:ToastrService) {
    this.signupForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s]+$/) // Only letters and spaces
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/)
        // Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
      ]]
    });
    
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/)
      ]]
    });
    
  }

  ngOnInit(): void {
    this.userService.isLoginFail.subscribe((fail) => {
      this.loginError = fail;
   
    });
  }

  toggleForm(showLogin: boolean) {
    this.showLogin = showLogin;
  }

  onSignUp() {
    if (this.signupForm.valid) {
      this.userService.singUp(this.signupForm.value);
    
      this.toastr.success('Signup successful! Please login now.');
      this.signupForm.reset()
      this.toggleForm(true); // show login form
    }
    else{
      this.toastr.error('Please fill all the fields')
    }
  }
  
  onSignIn() {
    if (this.loginForm.valid) {
      this.userService.userLogin(this.loginForm.value);
      this.toastr.success('SignIn successful! Happy Shopping !');
    }
  }
}
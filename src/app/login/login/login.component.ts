import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../_services/authentication.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean;
  submitted: boolean;
  returnUrl: string;
  error = '';
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticateService: AuthenticationService
  ) {
    if (this.authenticateService.userValue){
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  get f(): any{
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.authenticateService.login(this.f.username.value, this.f.password.value)
      .pipe(first()).subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
      error => {
        this.error = error;
        this.loading = false;
      });
  }
}

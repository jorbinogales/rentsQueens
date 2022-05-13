import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ResponseInterface } from 'src/app/interface/response.interface';
import { NavbarService } from './navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  session: boolean = false;
  loading: boolean = false;
  form: any = FormGroup;
  error: any;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _navbarService: NavbarService,
    private readonly _cookieService: CookieService,
    private readonly _router: Router,
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.onSession();
  }

  private buildForm(){
    this.form = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  private onSession(){
    const token = this._cookieService.get('token');
    token ? this.session = true : this.session = false;
  }
  

  login(){
    const button = document.getElementById('loginBtn');
    this.error = null;
    this.loading = true;
    const form = this.form.getRawValue();
    this._navbarService.login(form).subscribe((resp:any) =>{
      this.error = null;
      this.form.reset();
      this._cookieService.set('token', resp.access_token),
      this._router.navigate(['/', 'dashboard']);
      this.onSession();
      button.click();
      this.loading = false;
    },(err) => {
        if(err.error.message == ResponseInterface.NOT_FOUND_EXCEPTION) {
          this.error = 'Email or password incorrect';
        } else {
          this.error = err.error.message;
        }
        this.loading = false;
    })
  } 

  logout(){
    this._cookieService.delete('token');
    this.onSession();
  }h

}

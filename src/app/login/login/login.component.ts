import { Component, OnInit } from '@angular/core';
import { LoginserviceService } from 'src/app/services/loginservice.service';
import { Router } from '@angular/router';

import { FormGroup, FormBuilder, Validators} from '@angular/forms' ;
import { faEye, faEyeSlash, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faUser = faUser;
  passwordEye: boolean ;
  errorDatosInconrrectos: boolean ;
  errorDesconocido: boolean ;
  constructor(
    private fb: FormBuilder,
    private loginService: LoginserviceService,
    private router:Router
  ) { }

  ngOnInit(): void {

    this.formLogin = this.fb.group(
      {
        email: [ '' , [Validators.required, Validators.email] ],
        password: [ '' , [Validators.required] ],
      },
    );

  }
  

  onLogin(){

    this.errorDatosInconrrectos = false;
    this.errorDesconocido = false;

    this.loginService.authLoginForm(this.formLogin.value)
    .then((result) => {
      console.log(result)
      if( result.code === "auth/wrong-password" 
          || result.code === "auth/user-not-found"
            || result.code === "auth/invalid-email" )
        this.errorDatosInconrrectos = true;
      else
        this.errorDesconocido = true
    }).catch(() => {
      
    })
    
  }

  loginGoogle() {
    this.loginService.authGoogleLogin()
    .then(value => {
      this.loginService.validateUserInfo()
      this.router.navigate(['home'])
    })
    .catch(error => {
      console.log('Something went wrong: ', error);
    });
  }

  loginFacebook(){
    this.loginService.validateUserInfo()
    this.loginService.authFacebookLogin()
    .then(value => {
      this.router.navigate(['home'])
    })
    .catch(error => {
      console.log('Something went wrong: ', error);
    });
  }

  loginTwitter(){
    this.loginService.authTwitterLogin()
    .then(value => {
      this.loginService.validateUserInfo()
      this.router.navigate(['home'])
    })
    .catch(error => {
      console.log('Something went wrong: ', error);
    });
    
  }
  
  passwordEyeEvent(){
    this.passwordEye = !this.passwordEye
  }

}

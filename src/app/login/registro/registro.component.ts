import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms' ;
import { faEye, faEyeSlash, faUser, faBackspace, faBackward, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { LoginserviceService } from 'src/app/services/loginservice.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})


export class RegistroComponent implements OnInit {
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faUser = faUser; 
  faBackspace = faBackspace;
  faBackward = faBackward;
  faArrowCircleLeft = faArrowCircleLeft;
  formularioRegistro: FormGroup;
  emailPattern: '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  passwordEye: boolean;
  passwordConfirmedEye: boolean;
  emailFormError: boolean;
  constructor(
    private fb: FormBuilder,
    private loginserviceService:LoginserviceService
  ) { }

  ngOnInit(): void {
    this.formularioRegistro = this.fb.group(
      {
        nameuser: ['' , [Validators.required]],
        email: [ '' , [Validators.required, Validators.email] ],
        password:['' , [Validators.required, Validators.pattern( /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!$%@#£€*?&])[A-Za-z\d!$%@#£€*?&]{8,}$/ ) ]],
        verifyPassword:[ '', [Validators.required]]
      },
      {
        validator: this.MustMatch("password","verifyPassword")
      }
    );
  }


  passwordConfirmedEyeEvent(){
    this.passwordConfirmedEye = !this.passwordConfirmedEye
  }
  passwordEyeEvent(){
    this.passwordEye = !this.passwordEye
  }

  onRegister(){
    this.loginserviceService.registerAuthLogin(this.formularioRegistro.value)
    .then((result) => {
      if( result['Error'])
        this.emailFormError = true
    })
  }

  passwordValidator(g: FormGroup){
    return g.get('password').value === g.get('verifyPassword').value
      ? true : false ;
  }

  MustMatch(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) =>{
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if( matchingControl.errors && matchingControl.errors.MustMatch){
        return;
      }

      if (control.value !== matchingControl.value){
        matchingControl.setErrors({mustMatch:true});
      }else{
        matchingControl.setErrors(null);
      }
    }
  }

}

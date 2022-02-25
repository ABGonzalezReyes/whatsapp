import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import "firebase/auth";
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument ,}  from '@angular/fire/firestore' ;
import { Observable } from 'rxjs';

import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  uid;
  private itemDoc: AngularFirestoreDocument<User>;
  item: Observable<User>;
  private minutes = 30
  constructor(
    public afauth: AngularFireAuth,
    private router: Router,
    private firestore: AngularFirestore
  ) { }

  async registerAuthLogin(formulario){
    
    const result = await this.afauth.createUserWithEmailAndPassword(
      formulario.email,
      formulario.password
    )
    .then((userCredential) => {
      const user = userCredential.user;
      this.validateUserInfo()
      this.router.navigate(['home'])
    })
    .catch((error) => {
      const errorCode = error.errorCode
      const errorMessage = error.message
      return { Error: "El Correo no es válido" }
    })

    return result
  }

  async authLoginForm(formulario){
    const result = await this.afauth.signInWithEmailAndPassword(
      formulario['email'],
      formulario['password']
    )
    .then((userCredential) =>{
      const user = userCredential.user;
      this.router.navigate(['home'])
      this.setInfoUserInStorage()
    })
    .catch((error) => {
      return error
    });
    return result
  }

  authGoogleLogin(){
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.authLogin(provider)   
  }
  
  authFacebookLogin(){
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.authLogin(provider); 
  }

  authTwitterLogin(){
    const provider = new firebase.auth.TwitterAuthProvider();
    return this.authLogin(provider); 
  }

  authLogout(){
    this.afauth.signOut().then(result =>{
      this.router.navigate(['login'] , {})
    })
    .catch(error => {
      console.log('Something went wrong: ', error);
    });
  }

  private authLogin(provider){
    return this.afauth.signInWithPopup(provider) ;
  }

  getAuthUser(){
    const user = firebase.auth().currentUser
    return user
  }

  validateUserInfo(){
    this.uid = firebase.auth().currentUser.uid
    const user = this.firestore.doc<User>('users/' + this.uid);
    user.valueChanges().subscribe(res => {
      if(!res) this.registerUserInfo()
    })
    this.setInfoUserInStorage()
  }

  registerUserInfo(){

    const userInfo: User = {
      displayName : this.getAuthUser().displayName,
      email: this.getAuthUser().email,
      fechaRegistro: new Date(),
      idUsuario: this.getAuthUser().uid
    }
    this.firestore.collection('users').doc(this.getAuthUser().uid).set(userInfo)
    .then(result => {
      console.log('agregado correctamente')
    })
    .catch(error => {
      console.log("error: " + error)
    });
  }

  setInfoUserInStorage(){
    console.log('entra a la info de storage')
    if (typeof(Storage) !== 'undefined') {
      localStorage.setItem('exists' , 'true' )
      localStorage.setItem('nameUser' , this.getAuthUser().displayName )
      localStorage.setItem('email' , this.getAuthUser().email )
      localStorage.setItem('loginApp' , this.getAuthUser().providerData.toString() )
      localStorage.setItem('uid', this.getAuthUser().uid)
    } else {
      localStorage.setItem('exists' , 'false')
    }
  }
}

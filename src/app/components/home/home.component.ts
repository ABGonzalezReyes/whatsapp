import { Component, Inject, OnInit } from '@angular/core';
import { LoginserviceService } from 'src/app/services/loginservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  chat;
  chatFirebase;
  visible = false;
  constructor(
    private loginService: LoginserviceService,
  ) { 
  }

  onIntersection(event) {
    //this.visible = isIntersecting || this.visible;
    console.log('hizo algo dentro de esta funcion ')
    console.log(event[0])
    console.log(event[0].isIntersecting + " - " + event[0].target.id)
    
  }

  ngOnInit(): void {
    
  }


  onConversationSelected(chat){
    this.chat = chat;
  }

  onChatClicked(chat){
    //console.log(chat)
    this.chatFirebase = chat
  }

  logout() {
    this.loginService.authLogout()
  }

  getNameUser(): string {
    return localStorage.getItem('nameUser')
  }

}

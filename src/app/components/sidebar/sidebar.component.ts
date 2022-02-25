import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, BehaviorSubject , Subject} from 'rxjs';
//import { BehaviorSubject , Subject} from 'rxjs';
import { formatDate } from '@angular/common';
import { switchMap , map} from 'rxjs/operators';
import { Chat , ChatFirebase} from '../../interfaces/chat' ;
import { Message, MessageFirebase } from '../../interfaces/message' ;
import { Chats } from '../../chats';
import { User } from '../../interfaces/user';

import { ServerService  } from '../../services/server.service';
import { RelationShipService } from 'src/app/services/relation-ship.service';

import { faPlusCircle, faCheckDouble, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import firebase from 'firebase/app';
import { combineLatest } from 'rxjs';

export interface Item {
  text: string;
  combineReceivingUser: string;
  combineEmittingUser: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})


export class SidebarComponent implements OnInit {

  @Output() conversationClicked: EventEmitter<any> = new EventEmitter();
  @Output() chatClicked: EventEmitter<any> = new EventEmitter();
  searchText: string;
  searchTextUser : string;
  faPlusCircle = faPlusCircle;
  faCheckDouble = faCheckDouble;
  faCheckCircle = faCheckCircle;
  chats : Chat[] = Chats;
  
  all$: any;
  list = [];

  usersTest = [
    {id: 1, nombre :'abraham gonzalez' },
    {id: 2, nombre :'Andres gonzalez' },
    {id: 3, nombre :'maria gonzalez' },
    {id: 4, nombre :'erika gonzalez' },
  ];

  addChatFlag: boolean; 
  users$ =  new Subject<string>();
  resultUsers ;
  chatsFirebase ;
  userFinded: User;
  userfindedFlag : Boolean;
  constructor( 
    private  server: ServerService,
    private relationShip: RelationShipService,
    ) {

    

    this.users$.pipe(
      switchMap(searchingTerm => 
       this.relationShip.getRefUsers(searchingTerm)
      )
      ).subscribe(usersFinded => {
        console.log(usersFinded);
        this.userFinded = null
        this.userfindedFlag = false
        const userFinded = <User> usersFinded[0];
        
        if(this.chatsFirebase && this.chatsFirebase.length > 0){
          console.log('si entra')
          this.chatsFirebase.forEach( chat => {
            //console.log(chat)
            if( userFinded && userFinded.idUsuario !== firebase.auth().currentUser.uid){

              if( ( chat.idReceivingUser === userFinded.idUsuario  && chat.idEmittingUser === firebase.auth().currentUser.uid)
                  || ( chat.idEmittingUser === userFinded.idUsuario  && chat.idReceivingUser === firebase.auth().currentUser.uid)
                  ){
                this.userfindedFlag = true
                console.log('ya existe el chat: ya no se generará ninguno')
              }
              this.userFinded =  userFinded
            }else{
              console.log('el usuario buscado es el mismo de la sesion')
            }
          })
        }else{
          console.log('no entra')
          this.userFinded =  userFinded
        }
        
        
      });
    }

  ngOnInit(): void {

    this.all$ = combineLatest([
      this.relationShip.getUltimateChat('idEmittingUser').snapshotChanges(),
      this.relationShip.getUltimateChat('idReceivingUser').snapshotChanges()
    ]).pipe(
      map( ([emittingUserChats , receivingUserChats]) => {
        let list = []
        emittingUserChats.forEach(value => {
          list.push(value.payload.toJSON())
        })
        receivingUserChats.forEach(value => {
          list.push(value.payload.toJSON())
        })
        list.forEach(a => {
          a['$key'] = a.key;
        //this.infoRealtime.push(a as App);
        
          let idContact = ''
          if(a['idEmittingUser'] === firebase.auth().currentUser.uid )
            idContact = a['idReceivingUser']
          else 
            idContact = a['idEmittingUser']  
            
            //console.log('busqueda por idReceivingUser -> id a buscar es: ' + idContact)

          this.relationShip.getUser(idContact).valueChanges().subscribe(dataUser => {
            let user = <User> dataUser;
            a['nameContact'] = user.displayName
            //console.log({'busqueda por idReceivingUser -> user: ' : user})
          })

          this.relationShip.getUltimateMessage(a['idChat']).valueChanges().subscribe(UltimateMessage => {
            //console.log({'busqueda por idReceivingUser -> ultimateMessage: ' : UltimateMessage})
            if(UltimateMessage.length > 0){
              let ultimateMessage = <MessageFirebase> UltimateMessage[0];
              
              a['ultimateMessage'] = ultimateMessage.message === undefined ? null : ultimateMessage.message
              if( ultimateMessage.date === formatDate( new Date(), 'yyyy-MM-dd', 'en').toString() ) 
                a['timeUltimateMessage'] = ultimateMessage.time
              else
                a['timeUltimateMessage'] = ultimateMessage.date
              a['statusRead'] = ultimateMessage.statusRead

              a['me'] = (ultimateMessage.IdUser === firebase.auth().currentUser.uid) ? true : false ;
            }  
          })

        
        this.relationShip.getCountNotReadedMessages(a['idChat']).valueChanges().subscribe(messages =>{
          a['countNotReadedMessages'] = 0;
          messages.forEach(message => {
            //let mesg = message.payload.toJSON()
            //console.log(message)
            //console.log(message['statusRead'])
            if( !message['statusRead'] && message['IdUser'] !== firebase.auth().currentUser.uid ){
              a['countNotReadedMessages'] = a['countNotReadedMessages'] + 1;
              console.log("si entra" +  message['IdUser'] + ' - ' + firebase.auth().currentUser.uid)
            }else{
              console.log("no entra" +  message['IdUser'] + ' - ' + firebase.auth().currentUser.uid)
            }
            console.log('cuando termina: ' + a['countNotReadedMessages'])
            })
          })
        })
        //console.log(list)
        return list
      })
    )


  }

  printAll(){
    this.relationShip.printTestQuery()
  }
  

  get getChats(){
    return this.server.getChats(this.searchText)
  }
  
  changeAddChatStatus(){
    this.addChatFlag = !this.addChatFlag
  }

  onKeyNewFriends( event : any ){
      console.log(event.target.value)
      
    this.users$.next(event.target.value)
  }

  addNewFriend(user){
    this.relationShip.createChatOnRealtimeDatabase(user) ;
  }

  pushMessage(user){
    
  }

  getuser(chat){
    console.log(this.relationShip.getUser(chat).valueChanges().subscribe(data => {
      return data;
    }))
  }

  getCountNotReadedMessages(idChat){
    
  }
}

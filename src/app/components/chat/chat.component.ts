import { Component, OnInit , Input, Output, EventEmitter, ViewChild, AfterViewChecked, ElementRef, AfterViewInit, SimpleChanges, ChangeDetectorRef} from '@angular/core';
import { Message , MessageFirebase} from '../../interfaces/message' ;
import firebase from 'firebase/app';
import { RelationShipService } from 'src/app/services/relation-ship.service';
import {map} from 'rxjs/operators';
import { promise } from 'selenium-webdriver';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  
})
export class ChatComponent implements OnInit, AfterViewChecked {//AfterViewChecked
@ViewChild('idFocus') myErrorText: ElementRef;
@ViewChild('idContent') content: ElementRef;
  @Input() chat;
  @Input() chatFirebase;
  @Output() onSubmit:EventEmitter<any> = new EventEmitter();

  emojiPickerVisible: boolean;
  message = '';
  chatsFirebase ;
  idUsuario ;
  numberChange = 0;
  showChats = false
  
  constructor(
    private relationShip : RelationShipService,
    private ref: ChangeDetectorRef
  ) { 
    this.idUsuario = firebase.auth().currentUser.uid
    //this.myErrorText.nativeElement.focus();

    /*this.relationShip.getMessages(this.chatFirebase.idChat).valueChanges().subscribe(chats => {
      this.chatsFirebase = [] 
      let chatsFinded = <MessageFirebase[]> chats;
      chatsFinded.forEach( chat =>{
        this.chatsFirebase.push(chat)
      })
      //this.myErrorText.nativeElement.focus();
      //console.log(this.chatsFirebase)
    })*/
  }
  
  ngOnChanges(changes: SimpleChanges) {
      //this.doSomething(changes.categoryId.currentValue);
      // You can also use categoryId.previousValue and 
      // categoryId.firstChange for comparing old and new values
      
      this.setChats()
      /*for (const propName in changes) {
    const chng = changes[propName];
    const cur  = JSON.stringify(chng.currentValue);
    const prev = JSON.stringify(chng.previousValue);
    console.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
  }*/
      ///this.scrollToElement()
  }

  //ngAfterContentChecked() {        
  ngAfterViewChecked(){
    //this.ref.detach();
    
    /*
      this.scrollToElement()  
      let length = 0;
      if(this.chatsFirebase) length = this.chatsFirebase.length
      this.numberChange = this.numberChange + 1;
      console.log(this.numberChange +  " - " + length)
      */
    ///console.log(this.ref.markForCheck())  
    
  } 
  scrollToElement(): void {
    this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
    //console.log(this.content.nativeElement.scrollTop + ' - ' + this.content.nativeElement.scrollHeight)
    /*this.content.nativeElement.scroll({
      top: this.content.nativeElement.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });*/
  }

  ngOnInit(): void {
    
    this.setChats()
    
  }

  setChats(){
      
      this.showChats = false
      this.relationShip.getMessages(this.chatFirebase.idChat).snapshotChanges().subscribe(chats => {
        this.chatsFirebase = [] 
        chats.forEach(chat =>{
          let newChat = chat.payload.val()
          newChat['idKey'] = chat.key
          /*  
          console.log("----------")
          console.log(newChat)
          console.log("----------")
          console.log(chat.payload.val())
          console.log(chat.key)*/
          
          this.chatsFirebase.push(newChat)
        })
        
        /*
        let chatsFinded = chats;
        
        chatsFinded.forEach( chat =>{
          //chat.id = chat.IdChat
          this.chatsFirebase.push(chat)
          
        })*/
      })
      
    setTimeout(()=>{ 
        this.showChats = true
      }, 500 );
      setTimeout(() => {
        this.scrollToElement()
      }, 600);
      //this.scrollToElement()  
      //this.myErrorText.nativeElement.focus();
      //console.log(this.chatsFirebase)
    
  
    //this.scrollToElement()  
      //console.log('pintado desde el timeout')
    /*setTimeout(()=>{                           //<<<---using ()=> syntax
      
    }, 500);*/
    
  }

  printChatDos(){
    console.log(this.chatFirebase)
  }

  submitMessage(event): void{
    //console.log(this.chatFirebase)
    let value = this.message.trim();
    this.message = '' ;
    this.relationShip.saveMessage(
      value,
      this.chatFirebase.idChat
    )
    setTimeout(() => {
        this.scrollToElement()
      }, 5);  
      setTimeout(() => {
        this.scrollToElement()
      }, 10);
      setTimeout(() => {
        this.scrollToElement()
      }, 15);    
    
  }
  /*
  submitMessage(event): void {
    let value = this.message.trim();
    this.message = '' ;
    const message: Message = { 
      idMessage: 3, 
      message: value , 
      time:'05:00 AM', 
      statusRead:1, me:true 
    };
    this.chat.lastMessage = value ;
    this.chat.timeLastMessage = '05:00 AM';
    if( value.length > 0 ) 
      this.chat.historico.unshift(message);
  }

  */

  addEmoji(event){
    this.message += event.emoji.native + ' ';
  }

  //onIntersection([{ isIntersecting }]: IntersectionObserverEntry[]) {
   onIntersection(event,message) {
    //this.visible = isIntersecting || this.visible;
    //console.log('hizo algo dentro de esta funcion ')
    //console.log(event,message)
    
    //console.log(event[0].isIntersecting + " - " + message.IdUser + " - " + firebase.auth().currentUser.uid )
    //console.log(message)
    if(event[0].isIntersecting){
      console.log(event[0].isIntersecting + " - " + message.IdUser + " - " + firebase.auth().currentUser.uid )
      if(message.IdUser !== firebase.auth().currentUser.uid){
        message.statusRead = true;
        this.relationShip.changeStatusMessage(message)
      }else{

      } 
    }
  }
}

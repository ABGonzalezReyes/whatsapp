import { Injectable } from '@angular/core';

import { Chat } from '../interfaces/chat' ;
import { Message } from '../interfaces/message' ;
import { Chats } from '../chats' ;

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  chats : Chat[] = Chats ;
  constructor() { }

  addChat(chat: Chat){

  }
  addMessage( message: Message , user: string ){
    this.chats[user].historico.unshift(message) ;
    this.chats[user].lastMessage = message.message ;
    this.chats[user].timeLastMessage = message.time ;
  }

  getChats(searchText){
    if( !searchText )
      return this.chats
    else
      return this.chats.filter((chat)=>{
        return (
          chat.user
            .toLowerCase()
            .includes( searchText.toLowerCase() ) ||
          chat.lastMessage
            .toLowerCase()
            .includes( searchText.toLowerCase())
        );
      })
  }
}

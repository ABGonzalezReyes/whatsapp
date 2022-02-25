import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import { Observable, Subject,  } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument }  from '@angular/fire/firestore' ;
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import firebase from 'firebase/app';
import { User } from '../interfaces/user';
import { ChatFirebase } from '../interfaces/chat';
import { MessageFirebase } from '../interfaces/message';

 
@Injectable({
  providedIn: 'root'
})
export class RelationShipService {
  
  appsRef: AngularFireList<any> ;
  chatsRef: AngularFireList<any> ;
  messageRef: AngularFireList<any> ;
  
  constructor(
    private firestore: AngularFirestore,
    private db: AngularFireDatabase
    ) {
      this.chatsRef = this.db.list('chats')
      this.messageRef = this.db.list('messages')
      
  }

  getUltimateChat(field){
    //return this.db.list('chats', ref => ref.orderByChild(field).equalTo(firebase.auth().currentUser.uid).limitToLast(1)) ;
    return this.db.list('chats', ref => ref.orderByChild(field).equalTo(firebase.auth().currentUser.uid)) ;
  }

  getMessages( IdChat){
      return this.db.list('messages', ref => ref.orderByChild('IdChat').equalTo(IdChat).limitToLast(20)) ;
  }

  printTestQuery(){
    const query = firebase.database().ref('messages')
          .orderByChild('IdChat')
          .limitToLast(10)

    query.once('value', function(snapshot){
      snapshot.forEach(function (childSnapshot){
        var childKey = childSnapshot.key;
        var childDta = childSnapshot.val();
        //console.log(childKey)
        //console.log(childDta)
      })
    })

  }

  getRefUsers(searchingTerm){
    return this.firestore.collection('users', ref => ref.where('email', '==', searchingTerm).limit(1) ).valueChanges()
    //return this.firestore.collection('users', ref => ref.orderBy('email').startAt( searchingTerm).limit(10) ).valueChanges()
  }

  getUser(id){
    return this.firestore.doc('users/' +id)
  }
  getUltimateMessage(IdChat){
    return this.db.list('messages', ref => ref.orderByChild('IdChat').equalTo(IdChat).limitToLast(1)) ;
  }

  getCountNotReadedMessages(IdChat){
    return this.db.list('messages', ref => ref.orderByChild('IdChat').equalTo(IdChat))
  }

  changeStatusMessage(message){
    firebase.database().ref('messages/' + message.idKey).set(message)
  }

  createChat(user){

    const newChat: ChatFirebase = {
      idChat: '' ,
      idEmittingUser: localStorage.getItem('uid') ,
      idReceivingUser: user.idUsuario ,
      emittingDate: new Date() ,
      acceptingStatus: false ,
      ultimateMessage: 'Hola!',
      timeUltimateMessage: new Date(),
    }
    this.firestore.collection('chats').add(newChat)
    .then(result => {
      console.log('solicitud enviada correctamente')
    })
    .catch(error => {
      console.log("error: " + error)
    });
  }

  createChatOnRealtimeDatabase(user){
    var idChat = user.idUsuario + localStorage.getItem('uid') ;
    let date = new Date()
    const newChat: ChatFirebase = {
      idChat: idChat ,
      idEmittingUser: firebase.auth().currentUser.uid,
      idReceivingUser: user.idUsuario ,
      emittingDate: new Date() ,
      acceptingStatus: false ,
      ultimateMessage: 'Hola!',
      timeUltimateMessage: formatDate( new Date(), 'yyyy-MM-dd hh:mm:ss', 'en').toString()
    }
    console.log(newChat)
    this.chatsRef.set(idChat , newChat)

    .then(result => {
      const message : MessageFirebase = {
        IdChat: idChat ,
        IdUser: localStorage.getItem('uid') ,
        message: 'Hola! te gustaría chatear' ,
        time: formatDate( new Date(), 'hh:mm:ss', 'en').toString() ,
        date: formatDate( new Date(), 'yyyy-MM-dd', 'en').toString() ,
        statusRead: false,
        datetime: formatDate( new Date(), 'yyyy-MM-dd hh:mm:ss', 'en').toString()
      }

      this.addMessage(message)

    })
    .catch(error => {
      console.log("error: " + error)
    });
  }

  addMessage(message: MessageFirebase){
    this.messageRef.push(message)
  }

  saveMessage(messageString:string, idChat:string){
    const message : MessageFirebase = {
      IdChat: idChat ,
      IdUser: localStorage.getItem('uid') ,
      message: messageString,
      time: formatDate( new Date(), 'hh:mm:ss', 'en').toString() ,
      date: formatDate( new Date(), 'yyyy-MM-dd', 'en').toString() ,
      statusRead: false,
      datetime: formatDate( new Date(), 'yyyy-MM-dd hh:mm:ss', 'en').toString()
    }
    this.addMessage(message)
  }
  
}

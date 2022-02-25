import { Time } from '@angular/common';
import { Message } from './message' ;
export interface Chat{
    idChat: number ;
    user: string ;
    lastMessage: string;
    timeLastMessage: string;
    ultimateConnection: string;
    historico: Message[];
}

export interface ChatFirebase{
    idChat: string ,
    idEmittingUser: string ,
    idReceivingUser: string ,
    emittingDate: Date ,
    acceptingStatus: boolean ,
    ultimateMessage: string,
    timeUltimateMessage: any,
}
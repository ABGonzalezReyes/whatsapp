import { Chat } from './interfaces/chat' ;
import { Message } from './interfaces/message' ;

export const Chats : Chat[] = [
    {   idChat: 1 , 
        user: 'Abraham Gonzalez',
        ultimateConnection: 'últ. vez el lunes a la(s) 20:02',
        lastMessage: 'ahuevo que si',
        timeLastMessage: '05:00 AM',
        historico: [
            { idMessage: 1, message: 'soy el amoljfgbiñaurb´fgbuaófgbo´çsitçgobqçetógbçbgçoibrfçobvçonçfpGibaçerbvçoa´dubv´qBUERÓBÇI', time:'03:00 AM', statusRead:1, me:false },
            { idMessage: 2, message: 'am the fucking King', time:'04:00 AM', statusRead:1, me:false },
            { idMessage: 3, message: 'apoco no?', time:'05:00 AM', statusRead:1, me:false },
            { idMessage: 4, message: 'ahuevo que si', time:'05:00 AM', statusRead:1, me:true },
        ]
    },
    {   idChat: 2 , 
        user: 'Andres Gonzalez',
        ultimateConnection: 'últ. hoy a la(s) 13:02',
        lastMessage: 'xfas',
        timeLastMessage: '02:21 AM',
        historico: [
            { idMessage: 1, message: 'ando bien pedo', time:'01:00 AM', statusRead:1, me:false },
            { idMessage: 2, message: 'ven por mi', time:'01:30 AM', statusRead:1, me:false },
            { idMessage: 3, message: 'nel', time:'01:30 AM', statusRead:1, me:true },
            { idMessage: 4, message: 'llamo un uber', time:'01:31 AM', statusRead:1, me:true },
            { idMessage: 4, message: 'xfas', time:'02:21 AM', statusRead:1 , me:false},
        ]
    },
    {   idChat: 3 , 
        user: 'Maria Gonzalez',
        ultimateConnection: 'últ. hoy a la(s) 16:45',
        lastMessage: 'arre',
        timeLastMessage: '07:00 PM',
        historico: [
            { idMessage: 1, message: 'soy tu compañere', time:'03:00 PM', statusRead:1, me:false },
            { idMessage: 2, message: 'no tu compañera', time:'06:00 PM', statusRead:1, me:false },
            { idMessage: 2, message: 'nel perro', time:'06:01 PM', statusRead:1, me:true },
            { idMessage: 3, message: 'no me hables', time:'07:00 PM', statusRead:1, me: false },
            { idMessage: 3, message: 'arre', time:'07:00 PM', statusRead:1, me: true },
        ]
    },
    {   idChat: 4 , 
        user: 'Erika Gonzalez',
        ultimateConnection: 'últ. el Miércoles a la(s) 09:56',
        lastMessage: 'ahuevo que si',
        timeLastMessage: '05:00 AM',
        historico: [
            { idMessage: 1, message: 'estoy bien pendeja', time:'03:00 AM', statusRead:1, me: false },
            { idMessage: 2, message: 'a poco no?', time:'08:00 AM', statusRead:1, me: false },
            { idMessage: 3, message: 'ahuevo que si', time:'05:00 AM', statusRead:1, me:true },
        ]
    },
];
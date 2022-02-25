export interface Message{
    idMessage: number ;
    message: string ;
    time: string ;
    statusRead: number;
    me: boolean;
}

export interface MessageFirebase{
    IdChat: string;
    IdUser: string;
    message: string ;
    time: any ;
    date: any ;
    datetime: any;
    statusRead: boolean;
}
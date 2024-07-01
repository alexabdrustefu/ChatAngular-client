import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private hubConnection!: signalR.HubConnection;
  private baseUrl = "https://localhost:44381";
  public isConnected: boolean = false;

  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.baseUrl + '/Chat', {
        withCredentials: true // Includi credenziali
      })
      .build();

    this.hubConnection.on('ReceiveMessage', (user: string, message: string) => {
      console.log(`Message from ${user}: ${message}`);
      // Puoi aggiungere logica per gestire i messaggi ricevuti
    });

    this.hubConnection.onclose(() => {
      this.isConnected = false;
      console.log('Connection closed');
    });
  }

  public startConnection(): void {
    this.hubConnection
      .start()
      .then(() => {
        this.isConnected = true;
        console.log('Connection started');
      })
      .catch(err => console.log('Error while starting connection: ' + err));
  }

  public joinChat(UserName: string): void {
    if (this.isConnected) {
      const conn = { UserName, ChatRoom: '' };
      this.hubConnection.invoke('JoinChat', conn)
        .catch(err => console.error(err));
    } else {
      console.log('Connection is not established.');
    }
  }

  public joinSpecificChatRoom(UserName: string, ChatRoom: string): void {
    if (this.isConnected) {
      const connection = { UserName, ChatRoom };
      this.hubConnection.invoke('JoinSpecificChatRoom', connection)
        .catch(err => console.error(err));
    } else {
      console.log('Connection is not established.');
    }
  }

  public sendMessage(user: string, message: string): void {
    if (this.isConnected) {
      this.hubConnection.invoke('SendMessage', user, message)
        .catch(err => console.error(err));
    } else {
      console.log('Connection is not established.');
    }
  }
}

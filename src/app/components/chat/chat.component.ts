import {Component, OnInit} from '@angular/core';
import {SignalrService} from "../../service/signalr.service";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit{
  userName: string = '';
  chatRoom: string = '';
  message: string = '';

  constructor(public   signalrService: SignalrService) { }

  ngOnInit(): void {
    this.signalrService.startConnection();
  }

  joinChat(): void {
    this.signalrService.joinChat(this.userName);
  }

  joinSpecificChatRoom(): void {
    this.signalrService.joinSpecificChatRoom(this.userName, this.chatRoom);
  }

  sendMessage(): void {
    this.signalrService.sendMessage(this.userName, this.message);
  }
}

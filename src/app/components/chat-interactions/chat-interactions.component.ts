import { Component, OnInit } from '@angular/core';
import {ChatService} from "../../services/chat.service";

@Component({
  selector: 'app-chat-interactions',
  templateUrl: './chat-interactions.component.html',
  styleUrls: ['./chat-interactions.component.scss']
})
export class ChatInteractionsComponent implements OnInit {

  private message;

  constructor(private chatS: ChatService) { }

  ngOnInit() {
  }

  sendMessage() {
    this.chatS.sendMessage(this.message);
    this.message = '';
  }
}

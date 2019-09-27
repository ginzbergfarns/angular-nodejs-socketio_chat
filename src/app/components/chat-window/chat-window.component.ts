import { Component, OnInit } from '@angular/core';
import {ChatService} from "../../services/chat.service";

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit {
  msgList = [];

  constructor(private chatS: ChatService) { }

  ngOnInit() {
    this.initSubscription();
  }

  private initSubscription() {
    this.chatS.$messageHandler.subscribe((msg) => {
      this.addMessage(msg);
    });
  }

  public addMessage(msg) {
    console.log(msg);
    this.msgList.push(msg);
  }
}

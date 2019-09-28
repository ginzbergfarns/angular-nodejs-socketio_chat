import { Component, OnInit } from '@angular/core';
import {ChatService} from '../../services/chat.service';
import {RoomService} from '../../services/room.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit {
  msgList = [];

  constructor(private chatS: ChatService,
              private roomS: RoomService) { }

  ngOnInit() {
    this.initSubscription();
  }

  private initSubscription() {
    this.chatS.$messageHandler.subscribe((msg) => {
      this.addMessage(msg);
    });

    this.roomS.$changeRoomEvent.subscribe(() => {
      this.msgList = [];
    });
  }

  public addMessage(msg) {
    this.msgList.push(msg);
  }
}

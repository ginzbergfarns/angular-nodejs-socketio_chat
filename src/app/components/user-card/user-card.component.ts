import {Component, Input, OnInit} from '@angular/core';
import {ChatService} from "../../services/chat.service";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  connected = false;
  @Input() data;

  constructor(private chatS: ChatService) { }

  ngOnInit() {
    this.initSubscription();
  }

  private initSubscription() {
    this.chatS.$disconnectAllRoomEvent.subscribe(() => {
      this.connected = false;
    })
  }

  connectToRoom() {
    this.chatS.disconnectAllRoom();
    this.chatS.connectToRoom(this.data.room.id);
    this.connected = true;
  }
}

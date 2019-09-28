import {Component, Input, OnInit} from '@angular/core';
import {RoomService} from '../../services/room.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  connected = false;
  @Input() data;

  constructor(private roomS: RoomService) { }

  ngOnInit() {
    this.initSubscription();
  }

  private initSubscription() {
    this.roomS.$disconnectAllRoomEvent.subscribe(() => {
      this.connected = false;
    });
  }

  connectToRoom() {
    this.roomS.disconnectAllRoom();
    this.roomS.connectToRoom(this.data.room.id, true);
    this.connected = true;
  }
}

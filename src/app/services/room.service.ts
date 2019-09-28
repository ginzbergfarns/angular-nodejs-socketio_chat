import {EventEmitter, Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  public currentRoomId;

  // bindings
  public $disconnectAllRoomEvent = new EventEmitter();
  public $changeRoomEvent = new EventEmitter();

  constructor(private socket: Socket) { }

  connectToRoom(roomId, saveRoom: boolean = true) {
    if (saveRoom) {
      this.currentRoomId = roomId;
    }
    this.$changeRoomEvent.emit();
    this.socket.emit('roomJoin', roomId);
  }

  disconnectAllRoom() {
    this.$disconnectAllRoomEvent.emit();
  }
}

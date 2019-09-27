import {EventEmitter, Injectable} from '@angular/core';
import {Socket} from "ngx-socket-io";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket: Socket) {
    this.initEvents();
  }

  currentRoom;

  //bindings
  public $disconnectAllRoomEvent = new EventEmitter();
  public $messageHandler = this.socket.fromEvent('message');

  initEvents() {
    console.log('init events');
    this.socket.fromEvent('connection').subscribe((data) => {
      console.log('connection');
    })
  }

  connectToRoom(roomId, targetRoom: boolean = true) {
    if (targetRoom) {
      this.currentRoom = roomId;
    }
    this.socket.emit('roomJoin', roomId)
  }

  disconnectAllRoom() {
    this.$disconnectAllRoomEvent.next();
  }

  sendMessage(message) {
    this.socket.emit('message', message, this.currentRoom);
  }
}

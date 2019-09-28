import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {RoomService} from './room.service';
import {filter, map} from 'rxjs/operators';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket: Socket,
              private roomS: RoomService,
              private userS: UserService) {
    this.messageHandler();
  }

  // bindings
  public $messageHandler;
  private $socketMessageHandler = this.socket.fromEvent('message');


  public sendMessage(message) {
    const currentUser = this.userS.getCurrentUser();
    const msg = {
      text: message,
      roomId: this.roomS.currentRoomId,
      fromRoomId: currentUser.room.id,
    };
    this.socket.emit('message', msg);
  }

  public messageHandler() {
    console.log('message handler');
    this.$messageHandler = this.$socketMessageHandler.pipe(
      filter((message: any) => {
        console.log('new message');
        return message.roomId === this.roomS.currentRoomId || message.fromRoomId === this.roomS.currentRoomId;
      }),
      map((message: any) => {
        const userList = this.userS.getUserList();
        message.user = userList.filter(user => user.id === message.userId);
        return message;
      })
    );
  }
}

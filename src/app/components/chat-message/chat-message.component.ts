import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {
  @Input() data;
  public messageFromCurrentUser: boolean;

  constructor(private userS: UserService) { }

  ngOnInit() {
    const currentUserRoom = this.userS.getCurrentUser().room.id;
    if (currentUserRoom === this.data.fromRoomId) {
      this.messageFromCurrentUser = true;
    }
  }

}

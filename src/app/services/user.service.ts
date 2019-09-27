import { Injectable } from '@angular/core';
import {Socket} from "ngx-socket-io";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {ChatService} from "./chat.service";

interface userData {
  name: string;
  id: string;
  room: any;
}

@Injectable({
  providedIn: 'root'
})

export class UserService {
  public userCreateObservable: Observable<userData> = this.socket.fromEvent('userCreate');
  private currentUser;

  constructor(private socket: Socket,
              private http: HttpClient,
              private chatS: ChatService) {
  }

  private setCurrentUser(user) {
    sessionStorage.setItem('cruser', JSON.stringify(user));
    this.currentUser = user;
    this.chatS.connectToRoom(user.room.id, false);
  }

  public getUserList() {
    return this.http.get('http://localhost:8000/user-list').pipe(map((list: any[]) => {
      return list.filter(user => user.id !== this.currentUser.id);
    }));
  }

  public getCurrentUser() {
    if (!this.currentUser) {
      this.currentUser = JSON.parse(sessionStorage.getItem('cruser'));
    }
    return this.currentUser;
  }

  public createUser(name) {
    this.socket.emit('createUser', {name: name}, (user) => {
      this.setCurrentUser(user);
    });
  }
}

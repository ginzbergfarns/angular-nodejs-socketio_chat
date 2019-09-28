import { Injectable } from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {RoomService} from './room.service';

interface IUserData {
  name: string;
  id: string;
  room: any;
}

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private currentUser;
  private connectedToCurrentUserRoom: boolean = false;
  private userListDB = [];

  // bindings
  public userCreateObservable: Observable<any> = this.socket.fromEvent('userCreate');

  constructor(private socket: Socket,
              private http: HttpClient,
              private roomS: RoomService) {
    this.userCreateHandler();
  }

  private setCurrentUser(user) {
    sessionStorage.setItem('cruser', JSON.stringify(user));
    this.currentUser = user;
  }

  private userCreateHandler() {
    this.userCreateObservable.subscribe((user: IUserData) => {
      this.userListDB.push(user);
    });
  }

  public fetchUserList() {
    return this.http.get('http://localhost:8000/user-list').pipe(map((list: any[]) => {
      const listWithOutCurrentUser = list.filter(user => user.id !== this.currentUser.id);
      this.userListDB = [...this.userListDB, ...listWithOutCurrentUser];
      return listWithOutCurrentUser;
    }));
  }

  public getCurrentUser() {
    if (!this.currentUser) {
      this.currentUser = JSON.parse(sessionStorage.getItem('cruser'));
    }
    if (!this.connectedToCurrentUserRoom && this.currentUser) {
      this.roomS.connectToRoom(this.currentUser.room.id, false);
      this.connectedToCurrentUserRoom = true;
    }
    return this.currentUser;
  }

  public createUser(name) {
    this.socket.emit('createUser', {name}, (user) => {
      this.userListDB.push(user);
      this.setCurrentUser(user);
    });
  }

  public getUserList() {
    return this.userListDB;
  }
}

import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {NewUserDialogComponent} from '../new-user-dialog/new-user-dialog.component';
import {MatDialog} from '@angular/material';
import {RoomService} from '../../services/room.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  userList: any[] = [];
  dialogRef;

  constructor(private userS: UserService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.getUser();
    this.initSubscription();
  }

  private getUser() {
    let user = this.userS.getCurrentUser();
    if (!user) {
      this.createUser();
      this.dialogRef.afterClosed().subscribe(name => {
        this.userS.createUser(name);
        user = this.userS.getCurrentUser();
        this.fetchUserList();
      });
    } else {
      this.fetchUserList();
    }
  }

  private createUser() {
    this.dialogRef = this.dialog.open(NewUserDialogComponent, {
      height: '400px',
      width: '600px',
    });
  }

  private initSubscription() {
    this.userS.userCreateObservable.subscribe((data) => {
        this.addNewUser(data);
    });
  }

  private fetchUserList() {
    this.userS.fetchUserList().subscribe((data: any[]) => {
      this.userList = data;
    });
  }

  private addNewUser(data) {
    this.userList.push(data);
  }
}

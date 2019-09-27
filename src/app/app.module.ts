import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { ChatWindowComponent } from './components/chat-window/chat-window.component';
import { ChatInteractionsComponent } from './components/chat-interactions/chat-interactions.component';
import {ChatService} from "./services/chat.service";
import {UserService} from "./services/user.service";
import { HomeComponent } from './components/home/home.component';
import { ChatMessageComponent } from './components/chat-message/chat-message.component';
import {SocketIoConfig, SocketIoModule} from "ngx-socket-io";
import {HttpClientModule} from "@angular/common/http";
import {MatCardModule, MatDialogModule, MatFormFieldModule, MatInputModule} from "@angular/material";
import { NewUserDialogComponent } from './components/new-user-dialog/new-user-dialog.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from '@angular/material/icon';

const config: SocketIoConfig = { url: 'http://localhost:8000', options: {} }

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserCardComponent,
    ChatWindowComponent,
    ChatInteractionsComponent,
    HomeComponent,
    ChatMessageComponent,
    NewUserDialogComponent
  ],
  entryComponents: [
    NewUserDialogComponent
  ],
  imports: [
    HttpClientModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    BrowserModule,
    SocketIoModule.forRoot(config),
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    ChatService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

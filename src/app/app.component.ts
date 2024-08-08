import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListaSalasComponent } from './lista-salas/lista-salas.component';
import { ChatComponent } from './chat/chat.component';
import { UserService } from './user.service';
import { CommonModule } from '@angular/common';
import { ApiService } from './websocket.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListaSalasComponent, ChatComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit{
  title = 'zap2';
  setRoom: number = -1;
  userNames: { [key: number]: string } = {};

  constructor(protected user: UserService, private api: ApiService) {}

  ngOnInit(): void {
    this.getNamesUsers();
  }

  selectRoom(roomId: number): void {
    this.setRoom=roomId;
    console.log('Sala selecionada no pai:', roomId);
  }

  getNamesUsers(): void {
    this.api.getUsers().subscribe((data: any) => {
      for (const user of data) {
        this.userNames[user.id] = user.name;
      }
    });
}

}

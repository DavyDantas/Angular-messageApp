import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ApiService } from '../websocket.service';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-salas',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './lista-salas.component.html',
  styleUrls: ['./lista-salas.component.css']
})
export class ListaSalasComponent implements OnChanges {
  rooms: any[] = [];
  public newUserName: string = '';
  public roomName = '';
  @Input() userNames: { [key: number]: string } = {};
  @Output() room = new EventEmitter<number>();

  private ws: WebSocket | undefined;

  constructor(private apiService: ApiService, public User: UserService) {}

  ngOnChanges(): void {
    this.webSocket()
    this.getRooms()
  }


  webSocket(): void {
    if (this.User.getUser().id !== -1) {
      this.ws = new WebSocket(`ws://127.0.0.1:8000/ws/rooms/${this.User.getUser().id}/`);
      this.ws.onmessage = (event) => {
        this.rooms.push(JSON.parse(event.data));
      };
  }
}

  selectRoom(roomId: number): void {
    this.room.emit(roomId);
    console.log('Sala selecionada:', roomId);
  }

  createUser(): void {
    if (this.newUserName) {
      this.apiService.createUser({ name: this.newUserName }).subscribe(
        (response) => {
          if (response) {
            this.User.setUser(response);
            this.webSocket()
          }
        },
        (error) => {
          console.error('Erro ao criar usuário:', error);
        }
      );
    }
  }

  createRoom(): void {
    console.log(this.roomName);
    if (this.roomName !== ''){ 
      if (this.ws) {
        this.ws.send(this.roomName);
        this.roomName = '';
      }
    }
  }

  getRooms(): void {
    this.rooms = []
    this.apiService.getRooms().subscribe((data: any) => {
      this.rooms = data;
    });
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
export class ListaSalasComponent implements OnInit {
  rooms: any[] = [];
  public newUserName: string = '';
  public roomName = '';
  @Input() userNames: { [key: number]: string } = {};
  @Output() room = new EventEmitter<number>();

  private ws: WebSocket | undefined;

  constructor(private apiService: ApiService, public User: UserService) {}

  ngOnInit(): void {
    this.apiService.getRooms().subscribe((data: any) => {
      this.rooms = data;
    });

    this.webSocket(this.User.getUser().id);
  }

  webSocket(userId: number): void {
    if (userId !== -1) {
      this.ws = new WebSocket(`ws://127.0.0.1:8000/ws/rooms/${userId}/`);
      this.ws.onmessage = (event) => {
        const newRoom = JSON.parse(event.data);
        this.rooms.push(newRoom);
        console.log('Nova sala:', newRoom);
        console.log('Salas:', this.rooms);
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
            this.webSocket(response.id);
          }
        },
        (error) => {
          console.error('Erro ao criar usuário:', error);
        }
      );
    }
  }

  createRoom(): void {
    if (this.User.getUser() && this.roomName) {
      if (this.ws) {
        this.apiService.createRoom({ name: this.roomName, owner: this.User.getUser().id }).subscribe(
          (response) => {
            if (response) {
              if (this.ws) {
                this.ws.send(JSON.stringify(response));
              }
              this.roomName = '';
            }
          },
          (error) => {
            console.error('Erro ao criar sala:', error);
          }
        );
      }
    }
  }
}
import { Component, OnInit } from '@angular/core';
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
  public newUserName = '';
  public roomName = '';
  userNames: Map<number, string> = new Map();

  constructor(private apiService: ApiService, public User: UserService) {}

  ngOnInit(): void {
    this.apiService.getRooms().subscribe((data: any) => {
      this.rooms = data;
    });
  }

  createUser(): void {
    console.log(this.newUserName);
    if (this.newUserName) {
      this.apiService.createUser({ name: this.newUserName }).subscribe(
        (response) => {
          this.User.setUser(response);
          this.newUserName = '';
        },
        (error) => {
          console.error('Erro ao criar usuário:', error);
        
        }
      );
    }
  }

  getNameUserById(): void {
      this.apiService.getUsers().subscribe((data: any) => {
        for (const user of data) {
          this.userNames.set(user.id, user.name);
        }
      });
      console.log(this.userNames);
  }

  createRoom(): void {
      if (this.User.getUser()) {
        const ownerId = this.User.getUser()?.id || 0;
        this.apiService.createRoom({ name: this.roomName, owner: ownerId }).subscribe(
          (response) => {
            this.rooms.push(response);
          },
          (error) => {
            console.error('Erro ao criar sala:', error);
          }
        );
      } else{
        console.error('Usuário não logado');
      }
    }

  

}

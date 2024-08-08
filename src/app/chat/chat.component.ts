import { Component, Input, OnChanges, OnInit, Renderer2 } from '@angular/core';
import { ApiService } from '../websocket.service';
import { UserService } from '../user.service';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, MatIconModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnChanges{
  messages:any = []
  contentMsg: string = '';
  @Input() currentRoom!: number;
  room: { id: number; owner: number; name: string; participants: []; owner_name: string; } = { id: 0, owner: 0, name: '', participants: [], owner_name: '' };
  @Input() userNames: { [key: number]: string } = {};

  constructor(protected api: ApiService , protected User: UserService, private renderer: Renderer2) { }

  private ws: WebSocket | undefined;

  ngOnChanges(): void {
    this.getRoom(this.currentRoom);
    this.webSocket();
    this.getMessages(this.currentRoom);
  }

  sendMessage() {
    if (this.contentMsg !== '') {
      if (this.ws) {
        this.ws.send(this.contentMsg);
      } 
      this.contentMsg = '';
    }
  }
  
  getMessages(id:number): void {
    this.messages = [];
    this.api.getMessagesByRoom(id).subscribe((data: any) => {
      this.messages = data;
    });
    console.log(this.messages);
  }

  webSocket(): void {
    this.ws = new WebSocket(`ws://127.0.0.1:8000/ws/${this.currentRoom}/${this.User.getUser()?.id}`);
      this.ws.onmessage = (event) => {
        this.messages.push(JSON.parse(event.data));
      }
    }

  getRoom(id:number): void {
    this.api.getRoomsById(id).subscribe((data: any) => {
      this.room = data;
      this.api.getUserById(this.room.owner).subscribe((data: any) => {
        this.room.owner_name = data.name;
      }); 
    });
  }


}

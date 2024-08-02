import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebSocketService } from '../app.module';

@Component({
  selector: 'app-lista-salas',
  standalone: true,
  imports: [],
  templateUrl: './lista-salas.component.html',
  styleUrl: './lista-salas.component.css'
})
export class ListaSalasComponent implements OnInit {
  rooms: any[] = []
  constructor(private WebSocketService: WebSocketService) { }

  ngOnInit(): void {
    this.WebSocketService. ('http://127.0.0.1:8000/rooms/').subscribe((data: any) => {
      this.rooms = data;
    })
  }
}

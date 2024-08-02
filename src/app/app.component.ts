import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListaSalasComponent } from './lista-salas/lista-salas.component';
import { ChatComponent } from './chat/chat.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListaSalasComponent, ChatComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'zap2';
}

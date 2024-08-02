import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Corrigido para importar o módulo HTTP
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io'; // Importar o SocketIoModule

import { AppComponent } from './app.component';
import { ListaSalasComponent } from './lista-salas/lista-salas.component';
import { ChatComponent } from './chat/chat.component';
import { ApiService } from './websocket.service'; // Importar o serviço

const config: SocketIoConfig = { url: 'http://127.0.0.1:8000', options: {} }; // URL do seu servidor WebSocket


@NgModule({
    declarations: [
      AppComponent,
      ListaSalasComponent,
      ChatComponent
    ],
    imports: [
      BrowserModule,
      HttpClientModule, // Usar HttpClientModule
      SocketIoModule.forRoot(config) // Adicionar o módulo SocketIo
    ],
    providers: [ApiService],
    bootstrap: [AppComponent]
  })
  export class AppModule { }
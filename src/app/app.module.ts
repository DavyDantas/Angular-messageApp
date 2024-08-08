import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http'; 
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io'; 
import { ApiService } from './websocket.service'; 

const config: SocketIoConfig = { url: 'http://127.0.0.1:8000', options: {} };

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [ApiService, provideHttpClient()],
  bootstrap: []
})
export class AppModule { }

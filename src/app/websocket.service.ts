import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  createRoom(room: { name: string; owner: number }): Observable<any> {
    return this.http.post(`${this.baseUrl}/create/room/`, room);
  }

  getRooms(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/rooms/`);
  }

  getRoomsById(roomId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/rooms/${roomId}`);
  }

  createUser(user: { name: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/create/user/`, user);
  }

  getUserById(userId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/users/${userId}`);
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users/`);
  }

  createMessage(message: { content: string; owner: number|undefined; room: number }): Observable<any> {
    return this.http.post(`${this.baseUrl}/create/message/`, message);
  }

  getMessagesByRoom(roomId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/rooms/${roomId}/messages/`);
  }
}

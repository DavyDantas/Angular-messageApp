import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: { id: number, name: string } | null = null;

  constructor() { }

  setUser(user: { id: number, name: string }): void {
    this.user = user;
  }

  getUser(): { id: number, name: string } | null{
    return this.user;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  //we need api for update delete save read, (CRUD)
  private API_BASE_PATH: string = 'http://localhost:4200/api/';

  constructor(private _httpService: HttpClient) {}

  //we will send the user model to save the user
  addUser(user: User) {
    return this._httpService.post(`${this.API_BASE_PATH}users`, user);
  }

  updateUser(user: User) {
    return this._httpService.put(`${this.API_BASE_PATH}users${user.id}`, user);
  }

  getUsers() {
    return this._httpService.get(this.API_BASE_PATH + 'users');
  }

  getUser(userId: number) {
    this._httpService.get(`${this.API_BASE_PATH}users/${userId}`);
  }

  deleteUser(userId: number) {
    return this._httpService.delete(`${this.API_BASE_PATH}users/${userId}`);
  }
}

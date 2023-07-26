import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  //we need api for update delete save read, (CRUD)
  private API_BASE_PATH: string = 'http://localhost:4200/api/';

  constructor(private _httpService: HttpClient) {}

  getUsers(){
    return this._httpService.get(this.API_BASE_PATH+"users")
  }

  deleteUser(userId:number){
    return this._httpService.delete(`${this.API_BASE_PATH}users/${userId}`)
  }
}

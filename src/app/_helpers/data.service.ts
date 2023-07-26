import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root',
})
export class DataService implements InMemoryDbService {
  constructor() {}

  createDb() {
    let users: User[] = [
      {
        id: 1,
        title: 'Mr',
        firstName: 'Muhammad',
        lastName: 'Shahmeer',
        dob: '07/24/2023',
        email: 'muhmmadshahmeeronline@gmail.com',
        password: '123456',
        acceptTerms: true,
      },
      {
        id: 2,
        title: 'Mr',
        firstName: 'Muhammad',
        lastName: 'Ahmed',
        dob: '06/24/2023',
        email: 'muhmmadahmede@gmail.com',
        password: '568979',
        acceptTerms: true,
      },
    ];

    return {users}
  }
}

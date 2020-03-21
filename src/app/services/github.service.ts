import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiGithubService {

  constructor(private http: HttpClient) { }
  getUsers() {
    const url = 'https://api.github.com/users?'
    return this.http.get(url);
  }
  getUser(userName) {
    const url = 'https://api.github.com/user/' + userName;
    return this.http.get(url);
  }

}

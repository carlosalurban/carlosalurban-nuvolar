import { Component, OnInit } from '@angular/core';
import { ApiGithubService } from './services/github.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  apiList: object;
  userCollection: string[] = [];
  avatarCollection: string [] = [];
  constructor(private apiGitHubService: ApiGithubService) { }
  ngOnInit() {
    this.apiGitHubService.getUsers().subscribe(res => {
      this.apiList = res;
      for (const key in this.apiList) {
        if (this.apiList.hasOwnProperty(key)) {
          const element = this.apiList[key];
          this.userCollection.push(element.login);
          this.avatarCollection.push(element.avatar_url);
        }
      }
      console.log(this.userCollection);
      console.log(this.avatarCollection);
    });
  }


}

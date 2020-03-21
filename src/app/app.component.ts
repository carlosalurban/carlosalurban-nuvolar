import { Component, OnInit } from '@angular/core';
import { ApiGithubService } from './services/github.service';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  apiList: any[] = [];
  userCollection: string[] = [];
  avatarCollection: string[] = [];
  selectControl = new FormControl();
  optionFilter: Observable<any[]>;
  constructor(private apiGitHubService: ApiGithubService) { }

  ngOnInit() {
    this.apiGitHubService.getUsers().subscribe(res => {
      for (const key in res) {
        if (res.hasOwnProperty(key)) {
          const element = res[key];
          this.apiList.push(element);
        }
      }
      this.optionFilter = this.selectControl.valueChanges.pipe(
        startWith(''),
        map(value => this._optionFilter(value)));
    });
  }
  private _optionFilter(value: string): any[] {
    const filterValue = value;
    return this.apiList.filter(option => option.login.toLowerCase().includes(filterValue));
  }
  displayUsers(user) {
    return user ? user.login : undefined;
  }
}

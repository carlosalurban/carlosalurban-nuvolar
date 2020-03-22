import { Component, OnInit, Input } from '@angular/core';
import { ApiGithubService } from 'src/app/services/github.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user: any;
  public repo: any;
  public repoList: any;
  constructor(private gitHubService: ApiGithubService, private routerActive: ActivatedRoute) { }

  ngOnInit() {
    this.routerActive.params.subscribe(res => {
      this.gitHubService.getUser(res.userId).subscribe(user => this.user = user);
      this.gitHubService.getRepos(res.userId).subscribe((repo: any[]) => this.repo = repo)
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, debounceTime } from 'rxjs/operators';
import { ApiGithubService } from '../../services/github.service';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  private apiList: any[] = [];
  public selectControl = new FormControl();
  public optionFilter: Observable<any[]>;
  public filteredList: any[] = [];
  public user: any;
  constructor(private apiGitHubService: ApiGithubService, private router: Router) { }

  ngOnInit() {
    this.apiGitHubService.getUsers().subscribe((res: any[]) => {
      this.apiList = res;
    });
    this.selectControl.valueChanges.pipe(
      debounceTime(100), startWith(''),
      map(value => this._optionFilter(value)))
      .subscribe(users => this.filteredList = users);
  }

  private _optionFilter(value: string): any[] {
    const filterValue = value;
    return this.apiList.filter(option => option.login.toLowerCase().includes(filterValue));
  }

  displayUsers(user) {
    return user ? user.login : undefined;
  }

  onSubmit() {
    this.user = this.selectControl.value;
    this.router.navigate(['/profile', this.user.id]);
  }
}

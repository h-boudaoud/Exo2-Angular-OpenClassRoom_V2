import { Component } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {PostsService} from './services/posts.service';
import {PageTitlesService} from './services/page-titles.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Exo2-Angular-OpenClassRoom';
  private nameComponent: string;
  public postList: any;
  private pageTitle: string;

  constructor(
    public postsService: PostsService,
    private titleService: PageTitlesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.postList = this.postsService.postList;
    console.log('AppComponent -> posts :', this.postList.length, '\n', this.postList);
    this.nameComponent = (this.postList.length > 0) ? 'posts' : 'add';
    this.routeEvent(this.route);
  }

  changeComponent(component: string) {
    this.router.navigate([component]).then(r => true );
    /*
     console.log('route : ', this.route);
    */
  }

  routeEvent(route: ActivatedRoute) {
    let urlParams = null;
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd && e.url !== '/') {
        urlParams = e.url.split('/');
        urlParams.shift();
        console.log('this.route NavigationEnd url: ', urlParams[0]);
        this.nameComponent = urlParams.shift();
        console.log('this.route NavigationEnd e: ', e);
      }
      this.pageTitle = this.titleService.pageTitle(this.nameComponent, urlParams);
    });
  }
}

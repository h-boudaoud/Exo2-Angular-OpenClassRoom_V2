import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from '../../services/posts.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
  public postList: object;
  public params: {type: string , id: number};
  public nbPosts: {'all': number, 'delete': number};
  public isNull: boolean;

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.params = {type: '', id:  -1};
    console.log('PostListComponent -> constructor route.snapshot.params:', this.route.snapshot.params);
    console.log('PostListComponent -> constructor route.snapshot.params:', this.params);
  }

  ngOnDestroy(): void {
    // tslint:disable-next-line:no-unused-expression
    this.postList;
    // throw new Error('Method not implemented.');
  }

  ngOnInit() {
    this.nbPosts = {
      all: this.postsService.onLengthPostList(null),
      delete: this.postsService.onLengthPostList(false)
    };
    if (this.route.snapshot.params.type) {
    this.params.type = this.route.snapshot.params.type.toUpperCase() ;
    const id = Number(this.route.snapshot.params.id);
    this.params.id = isNaN(id) ? -1 : id;
    }
    console.log('PostListComponent -> ngOnInit route.snapshot.params:', this.route.snapshot.params);
    console.log('PostListComponent -> ngOnInit route.snapshot.params:', this.params);
    // @ts-ignore
    const paramsType = this.params.type ? this.params.type : '';
    // console.log('PostListComponent -> postList:', this.postList);
    console.log('PostListComponent -> ngOnInit route.root:', this.route.root);
    console.log('PostListComponent -> ngOnInit route.snapshot:', this.route.snapshot);
    console.log('PostListComponent -> ngOnInit param:', this.params);
    // @ts-ignore
    if (['ALL', 'DELETE'].includes(paramsType)) {
      const publication = (paramsType && paramsType === 'ALL') ? null :
        (paramsType &&  paramsType !== 'DELETE') ;
      this.postList = this.postsService.onGetPostList(publication);
      console.log('PostListComponent -> ngOnInit -> ', paramsType, ' postList:', this.postList);
    } else if (paramsType === 'DETAILS') {
      // @ts-ignore
      const postById  = this.postsService.onGetPostByID(this.params.id);
      console.log('\'PostListComponent -> ngOnInit  onGetPostByID(this.params.id) : ', postById );
      // @ts-ignore
      this.postList = postById ? [postById] : null;
      // tslint:disable-next-line:triple-equals use-isnan
    }  else if (paramsType !== '' && !isNaN(Number(paramsType)) && Number(paramsType) > 0) {
      // @ts-ignore
      const postById  = this.postsService.onGetPostByID(paramsType * 1);
      console.log('\'PostListComponent -> ngOnInit  onGetPostByID(this.params.id) : ', postById );
      // @ts-ignore
      this.postList = postById ? [postById] : null;
    } else {
      this.postList = this.postsService.onGetPostList(true);
    }
    console.log('PostListComponent -> ngOnInit  postList:', this.postList);
    // @ts-ignore
    this.isNull = this.postList.length < 1;
  }

}

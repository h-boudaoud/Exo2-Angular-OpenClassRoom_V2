import { Component, OnInit } from '@angular/core';
import {PostsService} from '../../services/posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  private postList: any[];

  constructor(
    private postsService: PostsService
  ) {
    // console.log('PostListComponent ->postsService :', postsService);
    // console.log('PostListComponent ->postList :', this.postList);
  }

  ngOnInit() {
    this.postList =  this.postsService.postList ;
    // console.log('PostListComponent -> postList:', this.postList);
  }

}

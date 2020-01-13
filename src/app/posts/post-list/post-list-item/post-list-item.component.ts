import {Component, Input, OnInit} from '@angular/core';
import {PostsService} from '../../../services/posts.service';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent implements OnInit  {
  @Input() index: number;
  @Input() id: number;
  post: object;

  constructor(private postsService: PostsService) {
    // cas de sélection des éléments par id
    this.index = postsService.onSearchPost(this.id);
  }

  ngOnInit(): void {
    this.post = this.postsService.postList[this.index];
  }

  private loveIt(rep) {
    this.postsService.onloveIt(this.index, rep);
    // console.log('loveIt(', rep, ') : ', this.postsService.postList[this.index]);
  }

  private deletePost() {
    this.postsService.onDeletePost(this.index);
  }
}

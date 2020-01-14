import {Component, Input, OnInit} from '@angular/core';
import {PostsService} from '../../../services/posts.service';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent implements OnInit  {
  // tslint:disable-next-line:variable-name
  index: number;
  @Input() post: object;

  constructor(private postsService: PostsService) {
  }

  ngOnInit(): void {
    // cas de sélection des éléments par id
    // @ts-ignore
    this.index = this.postsService.onSearchIndexPost(this.post.id);
  }

  loveIt(rep) {
    // @ts-ignore
    this.postsService.onLoveIt(this.post.id, rep);
    // console.log('loveIt(', rep, ') : ', this.postsService.postList[this.index]);
  }

  onChangePublished(): boolean {
    // @ts-ignore
    return this.postsService.onChangePublished(this.post.id);
  }

  deletePost() {
    // @ts-ignore
    console.log('deletePost onDeletePost avec l\'index : ', this.post.id);
    // @ts-ignore
    if (this.post.published) {
      // @ts-ignore
      this.postsService.onDeletePost(this.post.id); // suppression de la liste vue sur la page d'acceuil
    } else {
      // @ts-ignore
      this.postsService.onDeletePostByIndex(this.post.id); // suppression difinitive
    }
  }
}

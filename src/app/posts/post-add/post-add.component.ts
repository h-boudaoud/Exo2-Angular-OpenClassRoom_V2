import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PostsService} from '../../services/posts.service';

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.scss']
})
export class PostAddComponent implements OnInit {
  private activeSubmit: boolean;
  private contentError: boolean;
  private titleError: boolean;
  private newPost: { created_at: Date, last_update: Date; title: string; content: string; loveIts: number };
  @Input() index: number;
  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.activeSubmit = false;
    this.index = (this.route.snapshot.params.id) ? this.route.snapshot.params.id : this.index;

    if (this.index > -1) {
      this.newPost = this.postsService.postList[this.index];
    } else {
      this.newPost = {
        title: '',
        content: '',
        loveIts: 0,
        created_at: null,
        last_update: null
      };
    }
    this.titleError = true;
    this.contentError = true;
  }

  titleErrors() {
    const regex = RegExp('^[A-Za-z\\d\\- \'\")(\\][@:\\/,;.!àçèé°]+$');
    // console.log('this.newPost.title',this.newPost.title,'\nregex : ',regex.test(this.newPost.title.trim()))
    // @ts-ignore
    return !(this.newPost.title.trim().length === 0 || !regex.test(this.newPost.title.trim()));
  }

  contentErrors() {
    const regex = RegExp('^[A-Za-z\\d\\-\\s\'\")(\\][@:\\/,;.!àçèé°]+$');
    // console.log('this.newPost.content',this.newPost.title,'\nregex : ',regex.test(this.newPost.content.trim()))
    // @ts-ignore
    return !(this.newPost.content.trim().length === 0 || !regex.test(this.newPost.content.trim()));
  }

  onSubmit() {
    this.titleError = this.titleErrors();
    this.contentError = this.contentErrors();
    const validate = this.titleError && this.contentError;
    // console.log('validate :', validate);
    if (this.titleError && this.contentError) {
      let h: number;
      let w: number;
      h = document.getElementById('post-add').offsetHeight;
      w = document.getElementById('post-add').offsetWidth;
      if (this.index > -1) {
        this.newPost.last_update = new Date();
      } else {
        this.index = this.postsService.onLengthPostList();
        // @ts-ignore
        this.newPost.created_at = new Date();
        this.postsService.onAddPost(this.newPost);
      }
      // console.log('newPost :', this.newPost);
      // console.log('index :', index);
      // console.log('postList :', this.postsService.postList);

      // console.log(index, 'postList Add :', this.newPost);
      // console.log('postList Add :', this.postsService);

      this.activeSubmit = (this.postsService.postList[this.index] === this.newPost);
      document.getElementById('post-add').style.height = h + 'px';
      document.getElementById('post-add').style.width = w + 'px';

      // console.log('newPost : ', this.newPost, '\npostList[', index, '] ', this.postList[index]);
    }
    // console.log('posts : ', this.postList);
  }

}

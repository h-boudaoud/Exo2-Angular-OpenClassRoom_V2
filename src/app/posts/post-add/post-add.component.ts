import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PostsService} from '../../services/posts.service';

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.scss']
})
export class PostAddComponent implements OnInit {
  activeSubmit: boolean;
  contentError: boolean;
  titleError: boolean;
  post: object;
  index: number;

  // @Input() index: number;
  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.activeSubmit = false;

    console.log(
      ' ---------    PostAddComponent - ngOnInit L26   ----------- ',
      this.route.snapshot.params.id > 0
    );
    // this.index = (this.route.snapshot.params.id) ? this.route.snapshot.params.id : this.index;
    if (this.route.snapshot.params.id > 0) {
      const id = this.route.snapshot.params.id * 1;
      this.post = this.postsService.onGetPostByID(id);
      console.log('PostAddComponent - ngOnInit L29 - post : ', this.post);
      this.index = this.postsService.onSearchIndexPost(id);
    } else {
      // @ts-ignore
      this.index = -1;

      this.post = {
        title: '',
        // l'implimentation de l'id peut aussi se faire dans postsServive ou au niveau de la base de données
        id : this.postsService.onGenerateID(),
        published: true,
        content: '',
        loveIts: 0,
        created_at: null,
        last_update: null
      };
    }

    console.log('PostAddComponent - ngOnInit - index : ', this.index);
    console.log('PostAddComponent - ngOnInit - post : ', this.post);

    this.titleError = true;
    this.contentError = true;
  }

  titleErrors() {
    const regex = RegExp('^[A-Za-z\\d\\- \'\")(\\][@:\\/,;.!àçèé°]+$');
    // console.log('this.post.title',this.post.title,'\nregex : ',regex.test(this.post.title.trim()))
    // @ts-ignore
    return !(this.post.title.trim().length === 0 || !regex.test(this.post.title.trim()));
  }

  contentErrors() {
    const regex = RegExp('^[A-Za-z\\d\\-\\s\'\")(\\][@:\\/,;.!àçèé°=><+&%]+$');
    // console.log('this.post.content',this.post.title,'\nregex : ',regex.test(this.post.content.trim()))
    // @ts-ignore
    return !(this.post.content.trim().length === 0 || !regex.test(this.post.content.trim()));
  }
  private onValidate(): boolean {
    this.titleError = this.titleErrors();
    this.contentError = this.contentErrors();
    // const validate = this.titleError && this.contentError;
    // console.log('validate :', validate);
    return this.titleError && this.contentError;
  }

  onSubmit() {
    // @ts-ignore
    console.log('PostAddComponent - onSubmit - .published : ', this.post.published);
    console.log('PostAddComponent - onSubmit - post : ', this.post);
    if (this.onValidate()) {
      let h: number;
      let w: number;
      h = document.getElementById('post-add').offsetHeight;
      w = document.getElementById('post-add').offsetWidth;
      // @ts-ignore
      if (this.index > -1) {
        // @ts-ignore
        this.post.last_update = new Date();
      } else {
        // @ts-ignore
        this.post.created_at = new Date();
      }

      this.activeSubmit =  this.postsService.onEditOrAddPost(this.post);
      // console.log('post :', this.post);
      // console.log('postList :', this.postsService.postList);

      // console.log(index, 'postList Add :', this.post);
      // console.log('postList Add :', this.postsService);

      // @ts-ignore
      // this.activeSubmit = (this.postsService.onGetPostByID(this.post.id) === this.post);
      document.getElementById('post-add').style.height = h + 'px';
      document.getElementById('post-add').style.width = w + 'px';

      // console.log('post : ', this.post, '\npostList[', index, '] ', this.postList[index]);
    }
    // console.log('posts : ', this.postList);
  }
}

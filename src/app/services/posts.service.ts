import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  public postList = [];
  constructor() {
    // @ts-ignore
    this.postList = [
      {
        id: 1,
        published : true,
        title: 'post n°1',
        content: 'ceci est le premier post',
        loveIts: 3,
        created_at: new Date('2019-11-20 11:04:10'),
        last_update: null,
        // posts: []
      },
      {
        id: 2,
        published : false,
        title: 'un autre post',
        content: 'hé oui\nUn nouveau post',
        loveIts: 0,
        created_at: new Date('2019-11-21 15:05:17'),
        last_update: new Date('2019-11-23 15:05:17'),
        // posts: []
      },
      {
        id: 3,
        published : true,
        title: 'post numéro 3',
        content: 'le dernier post inutile\nTestant ce code',
        loveIts: -3,
        created_at: new Date('2019-11-22 11:05:37'),
        last_update: null,
        // posts: []
      },
      {
        id: 4,
        published : false,
        title: 'post numéro 4',
        content: 'test de filter => published = false\nCe post ne doit pas s\'afficher\nTestant ce code',
        loveIts: -3,
        created_at: new Date('2019-11-22 11:05:37'),
        last_update: null,
        // posts: []
      },
      {
        id: 5,
        published : true,
        title: 'post numéro 5',
        content: 'test de filter => published = true\nCe post  doit s\'afficher\nTestant ce code',
        loveIts: -3,
        created_at: new Date('2019-11-22 11:05:37'),
        last_update: null,
        // posts: []
      },

    ];
  }
  onGetPostList(published?: boolean | null): object {
    const boolFilter = published !== null &&  typeof published === 'boolean';
    console.log(
      'postsServices filter onGetPostList  before if \n - type published :', typeof published,
      '\n - published :', published,
      '\n boolFilter', boolFilter
    );
    if (boolFilter) {
      const posts = this.postList.filter((post) => {
        return post.published === published;
        // const returnpost = post.published === published;
        // console.log(
        //   'id ', post.id,
        //   '\npostsServices filter onGetPostList on if \n - type published :', typeof post.published,
        //   '\n - published :', published,
        //   '\n - post.published :', post.published,
        //   '\n - returnpost :', returnpost
        // );
        // return returnpost;
      });
      console.log(
        'postsServices filter onGetPostList  after if \n - published :', published,
        '\n - posts :', posts
      );
      return posts;
    }
    return this.postList;
  }

  // onGetPostByIndex(index: number): object {
  //   return this.postList[index];
  // }


  onGetPostByID(id: number): object {
    try {
    return this.postList.find((post) => post.id === id);
    } catch (e) {
      console.log('aucun élément avec l\'id : ', id);
    }
    return null;
  }

  onEditOrAddPost(post: object): boolean {
    console.log('onAddPost post :', post);
    // @ts-ignore
    const index = this.onSearchIndexPost(post.id);
    try {
      if (index === -1) {
        this.postList.push(post);
      } else {
      this.postList[index] = post;
      }
      return true;
    } catch (e) {
      console.log('Error -> onEditOrAddPost', e);
    }
    return false;
  }

  onDeletePost(id: number) {
    const  index = this.onSearchIndexPost(id);
    console.log('postsServices onDeletePost avec l\'index : ', index);
    this.postList[index].published = false;
    console.log('postsServices deletePost onDeletePost avec l\'index : ', this.postList[index]);
  }

  onDeletePostByIndex(id: number) {
    const  index = this.onSearchIndexPost(id);
    console.log('postsServices onDeletePost avec l\'index : ', index);
    this.postList.splice(index, 1);
  }

  onLengthPostList(published?: boolean | null) {
    console.log('postsServices onLengthPostList type published :', typeof published, '\t published :', published);
    // @ts-ignore
    return (this.postList) ? this.onGetPostList(published).length : 0;
  }

  onLoveIt(id: number, loveIt: boolean) {
    const index = this.onSearchIndexPost(id);
    if (loveIt) {
      this.postList[index].loveIts++;
    }
    if (!loveIt) {
      this.postList[index].loveIts--;
    }
  }

  onSearchIndexPost(id: number): number  {

    console.log('PostsService - onSearchIndexPost avec l\'id : ', id);
    let index = -1;
    try {
      index = this.postList.findIndex((post) => post.id === id);
    } catch (e) {
      console.log('onSearchIndexPost -> aucun élément avec l\'id : ', id, '\n e ', e.message);
    }
    return index;
  }

  onGenerateID() {
    return this.postList[this.postList.length - 1].id + 1;
  }

  onChangePublished(id: number): boolean {
    const index = this.onSearchIndexPost(id);
    if (index > -1 && index < this.postList.length) {
      this.postList[index].published = !this.postList[index].published;
      return true;
    }
    return false;
  }
}

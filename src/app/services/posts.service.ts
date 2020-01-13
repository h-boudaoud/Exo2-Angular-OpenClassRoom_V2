import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  readonly postList = [];
  constructor() {
    // @ts-ignore
    this.postList = [
      {
        id: 1,
        title: 'post n°1',
        content: 'ceci est le premier post',
        loveIts: 3,
        created_at: new Date('2019-11-20 11:04:10'),
        last_update: null,
        // posts: []
      },
      {
        id: 2,
        title: 'un autre post',
        content: 'hé oui\nUn nouveau post',
        loveIts: 0,
        created_at: new Date('2019-11-21 15:05:17'),
        last_update: new Date('2019-11-23 15:05:17'),
        // posts: []
      },
      {
        id: 3,
        title: 'post numéro 3',
        content: 'le dernier post inutile\nTestant ce code',
        loveIts: -3,
        created_at: new Date('2019-11-22 11:05:37'),
        last_update: null,
        // posts: []
      },

    ];
  }

  onAddPost(post: object) {
    this.postList.push(post);
  }

  onDeletePost(index: number) {
    this.postList.splice(index, 1);
  }
  onLengthPostList() {
    return (this.postList) ? this.postList.length : 0;
  }

  onloveIt(index: number, rep: boolean) {
    if (rep) {
      this.postList[index].loveIts++;
    }
    if (!rep) {
      this.postList[index].loveIts--;
    }
  }
  onSearchPost(id: number): number {
    return this.postList.findIndex((post) => post.id === id);
  }
}

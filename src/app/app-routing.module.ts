import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PostAddComponent} from './posts/post-add/post-add.component';
import {PostListComponent} from './posts/post-list/post-list.component';
import {PostListItemComponent} from './posts/post-list/post-list-item/post-list-item.component';
import {ErrorComponent} from './error/error.component';
import {DocumentComponent} from './document/document.component';


const routes: Routes = [
  {path: 'add', component: PostAddComponent},
  {path: 'edit/:id', component: PostAddComponent},
  {path: 'posts/:id', component: PostListItemComponent},
  {path: 'posts', component: PostListComponent},
  {path: 'document/:name', component: DocumentComponent},
  {path: 'error', component: ErrorComponent},
  {path: '', component: PostListComponent},
  {path: '**', redirectTo: 'error'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

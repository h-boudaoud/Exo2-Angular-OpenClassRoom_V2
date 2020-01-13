import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostAddComponent } from './posts/post-add/post-add.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostListItemComponent } from './posts/post-list/post-list-item/post-list-item.component';
import { DocumentComponent } from './document/document.component';
import { ErrorComponent } from './error/error.component';
import {PostsService} from './services/posts.service';
import {PageTitlesService} from './services/page-titles.service';

@NgModule({
  declarations: [
    AppComponent,
    PostAddComponent,
    PostListComponent,
    PostListItemComponent,
    DocumentComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    PostsService,
    PageTitlesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

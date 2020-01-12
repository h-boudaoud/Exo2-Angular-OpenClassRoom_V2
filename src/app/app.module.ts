import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostAddComponent } from './posts/post-add/post-add.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostListItemComponent } from './posts/post-list/post-list-item/post-list-item.component';
import { DocumentComponent } from './document/document.component';
import { ErrorComponent } from './error/error.component';

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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

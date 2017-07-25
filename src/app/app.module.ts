import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { NgModule, ApplicationRef } from '@angular/core';
import { HttpModule } from '@angular/http';
// import { TransferHttpModule } from '../modules/transfer-http/transfer-http.module';
// import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { AppRoutingModule } from './app.routing.modules';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryComponent } from './category/category.component';
import { ArticleComponent } from './article/article.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryListComponent,
    CategoryComponent,
    ArticleComponent,
    HomeComponent
  ],
  imports: [BrowserModule, HttpModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
  exports: [AppComponent]
})
export class AppModule {}

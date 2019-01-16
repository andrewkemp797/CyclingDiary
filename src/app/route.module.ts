import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login.component/login.component';
import { FeedComponent } from './components/feed.component/feed.component';

const routes: Routes = [
  { path: 'feed', component: FeedComponent },
  { path: '', redirectTo: '/login', component: LoginComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class RouteModule { }

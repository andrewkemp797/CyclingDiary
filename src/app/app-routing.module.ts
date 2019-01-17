import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login.component/login.component';
import { FeedComponent } from './components/feed.component/feed.component';
import { EventComponent } from './components/event.component/event.component';
import { EntryComponent } from './components/entry.component/entry.component';
import { EventDirective } from './directives/event.directive';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap';
import { DlDateTimePickerDateModule } from 'angular-bootstrap-datetimepicker';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'feed', component: FeedComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: FeedComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }

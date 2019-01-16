import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './components/app.component/app.component';
import { FeedComponent } from './components/feed.component/feed.component';
import { EventComponent } from './components/event.component/event.component';
import { EventDirective } from './directives/event.directive';
import { DlDateTimePickerDateModule } from 'angular-bootstrap-datetimepicker';
import { LoginComponent } from './components/login.component/login.component';

@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    EventComponent,
    EventDirective,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, 
    FormsModule,
    ModalModule.forRoot(),
    DlDateTimePickerDateModule,
  ],
  providers: [], 
  entryComponents: [LoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

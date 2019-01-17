import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap';

import { FeedComponent } from './components/feed.component/feed.component';
import { EventComponent } from './components/event.component/event.component';
import { EntryComponent } from './components/entry.component/entry.component';
import { EventDirective } from './directives/event.directive';
import { DlDateTimePickerDateModule } from 'angular-bootstrap-datetimepicker';
import { LoginComponent } from './components/login.component/login.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EntryComponent,
    FeedComponent,
    EventComponent,
    EventDirective,
    LoginComponent 
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    DlDateTimePickerDateModule,
  ],
  providers: [], 
  entryComponents: [EventComponent],
  bootstrap: [EntryComponent]
})
export class AppModule { }

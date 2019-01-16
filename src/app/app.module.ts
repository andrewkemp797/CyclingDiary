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


@NgModule({
  declarations: [
  ],
  imports: [
    AppRoutingModule
  ],
  providers: [], 
  entryComponents: [LoginComponent],
  bootstrap: [EntryComponent]
})
export class AppModule { }

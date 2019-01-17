import { Component, OnInit, ViewChild, ComponentFactoryResolver, Input, ElementRef } from '@angular/core';
import { Event } from '../../models/event';
import { EventService } from '../../services/event.service';
import { EventComponent } from '../event.component/event.component';
import { EventDirective } from '../../directives/event.directive';
import { ModalDirective } from 'ngx-bootstrap';
import { environment } from 'src/environments/environment';
import { Guid } from 'guid-typescript'

@Component({
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  @Input() public event: Event;
  //feeds
  public feeds: Event[] = new Array();
  public continuationToken: string = '';

  //Get directive which contains ViewContainerRef
  @ViewChild(EventDirective) eventHost: EventDirective;
  @ViewChild('newEventModal') modalRef: ModalDirective;

  constructor(private eventService: EventService, private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit() {
    this.event = 
        { 
          id: Guid.create().toString(), 
          userId: '1',
          attending: [],
          date: new Date(), 
          verticalAscend: 0, 
          distance: 0, 
          description: "" ,
        };
    this.subscribeToFeeds();
  }
  
  subscribeToFeeds(): void {
    this.eventService.readEvents(null, environment.config.pageSize).subscribe(resp => {
      console.log(resp.body);
      this.feeds = resp.body;
      this.continuationToken = resp.headers ? null : resp.headers.get('continuationToken');
    },
    error => {
      console.log(error);
    },
    () => {
      this.populateFeeds();
    });
  }

  populateFeeds(): void {
    //resolve my component dynamically 
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(EventComponent);
    //get FeedComponent's ViewContainer (serves as parent viewContainer)
    let viewContainerRef = this.eventHost.viewContainerRef;
    viewContainerRef.clear();

    if (this.feeds){
      this.feeds.forEach(x => {
        let component = viewContainerRef.createComponent(componentFactory);
        (<EventComponent>component.instance).event = x;
        (<EventComponent>component.instance).readAllComments();
      });      
    }
  }

  addEvent(): void {
    this.eventService.addNewEvent(this.event).subscribe(resp => {
      if (resp.ok) {
        console.log(resp);
        this.subscribeToFeeds();
      } else {
        console.log(resp.status + ':' + resp.body)
      }
    },
    error => {
      console.log(error);
    })
  }
}

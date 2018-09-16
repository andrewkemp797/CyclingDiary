import { Component, OnInit, ViewChild, ComponentFactoryResolver, Input, ElementRef } from '@angular/core';
import { Event } from '../../models/event';
import { EventService } from '../../services/event.service';
import { EventComponent } from '../event.component/event.component';
import { EventDirective } from '../../directives/event.directive';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  @Input() public event: Event;
  //feeds
  public feeds: Event[];

  //Get directive which contains ViewContainerRef
  @ViewChild(EventDirective) eventHost: EventDirective;
  @ViewChild('newEventModal') modalRef: ModalDirective;

  constructor(private eventService: EventService, private componentFactoryResolver: ComponentFactoryResolver) {
    this.event = 
        { 
          id: 0, 
          user: { name: 'Che', surname: 'Kemp', pictureUrl: '' }, 
          attending: 0, 
          date: new Date(), 
          verticalAscend: 0, 
          distance: 0, 
          description: "" ,
          comments: new Array()
        };
  }

  ngOnInit() {
    this.getFeeds();
  }
  
  getFeeds(): void {
    this.eventService
    .getEvents()
    .subscribe(o => 
      { 
        this.feeds = o;
        this.populateFeeds();
      });
  }
  populateFeeds(): void {
    //resolve my component dynamically 
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(EventComponent);
    //get FeedComponent's ViewContainer (serves as parent viewContainer)
    let viewContainerRef = this.eventHost.viewContainerRef;
    viewContainerRef.clear();

    if (this.feeds !== undefined){
      this.feeds.forEach(x => {
        let component = viewContainerRef.createComponent(componentFactory);
        (<EventComponent>component.instance).event = x;
        //(<EventComponent>component.instance).getComments();
      });      
    }
  }

  addEvent(): void {
    this.eventService.addEvent(this.event);
    this.getFeeds();
  }
}

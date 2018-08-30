import { Component, OnInit, Input } from '@angular/core';
import { Event } from '../../models/event';
import { Comment } from '../../models/comment';
import { EventService } from '../../services/event.service';
import { CommandName } from 'protractor';
import { text } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent {

  @Input() public event: Event;
  @Input() public comment: Comment;
  public comments: Comment[];
  
  constructor(public eventService: EventService) {
    this.comment = { text: '', date: new Date(), user: { name: 'Nicole', surname: 'Kemp', pictureUrl: ''}, eventId: 0 };
    this.event = 
    { 
      id: 0, 
      user: { name: 'Che', surname: 'Kemp', pictureUrl: '' }, 
      attending: 0, 
      date: new Date(), 
      verticalAscend: 0, 
      distance: 0, 
      description: "", 
      comments: new Array() };
   }
  addEvent(): void {
    this.eventService.addEvent(this.event);
  }

  addComment(): void {
    this.event.comments.push(this.comment);
    this.eventService.updateEvent(this.event);
    this.comment = { text: '', date: new Date(), user: { name: 'Nicole', surname: 'Kemp', pictureUrl: ''}, eventId: 0 };
  }

  increaseJoining() : void {
    this.event.attending += 1;
    this.eventService.updateEvent(this.event);
  }

  refresh() : void {
    this.eventService
      .getEventByid(this.event.id)
      .subscribe(x => this.event = x);
  }
}

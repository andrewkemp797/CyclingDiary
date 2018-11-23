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
  
  constructor(public eventService: EventService) {}

  addComment(): void {
    this.comment.rideEventId = this.event.id;
    this.comment.date = new Date();
    this.comment.userId = "";
  }

  increaseJoining() : void {
    // this.event.attending += 1;
    // this.eventService.updateEvent(this.event);
  }

  refresh() : void {
    this.eventService.readEvents();
  }
}

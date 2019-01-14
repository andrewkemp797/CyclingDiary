import { Component, OnInit, Input } from '@angular/core';
import { Event } from '../../models/event';
import { Comment } from '../../models/comment';
import { EventService } from '../../services/event.service';
import { CommandName } from 'protractor';
import { text } from '@angular/core/src/render3/instructions';
import { Guid } from "guid-typescript";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent {

  @Input() public event: Event;
  // @Input() public comment: Comment;
  public comments: Comment[];
  public comment: Comment;
  
  constructor(public eventService: EventService) {}

  ngOnInit() {
    this.comment = 
    {
      id: Guid.create().toString(),
      text: '',
      rideEventId: '',
      date: new Date(),
      userId: '1'
    };
  }

  readAllComments(): void {
    this.eventService.readAllEventComments(this.event.id).subscribe(resp => {
      this.comments = resp;
    },
    error => {
      console.log(error);
    });
  }

  addComment(): void {
    this.comment.id = Guid.create().toString();
    this.comment.rideEventId = this.event.id;
    this.comment.date = new Date();
    this.comment.userId = "1";

    this.eventService.addNewComment(this.comment).subscribe(resp => {
      if (resp.ok) {
        this.readAllComments();
      } else {
        console.log(resp.status + ':' + resp.body);
      }
    }, 
    error => {
      console.log(error);
    });
  }

  increaseJoining() : void {
    //TODO: get id of logged in user
    let loggedInUserId = Guid.create().toString();
    this.event.attending.push(loggedInUserId);

    this.eventService.updateEvent(this.event).subscribe(resp => {
      if (resp.ok) {
        
      }
    },
    error => {
      console.log(error);
    });
  }

  refresh() : void {
    //this.eventService.readEvents();
  }
}

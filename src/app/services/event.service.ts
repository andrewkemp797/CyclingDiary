import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Comment } from '../models/comment';
import { Event } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private comments: Comment[] = 
  [
    {
      user: { name: 'Marnus', surname: 'Van Den Berg', pictureUrl: '' },
      text: 'Klink na n lekker event. Ek sal join.',
      date: new Date(),
      eventId: 1
    },
    {
      user: { name: 'Ryan', surname: 'Wallace', pictureUrl: '' },
      text: 'Klink na n lekker event. Ek sal moet kyk hoe laat ek klaar maak met werk voor ek kan commit.',
      date: new Date(),
      eventId: 1
    }
  ];
  private events: Event[] =
  [ 
    { 
      id: 1,
      description: "This is my test ride, blah blah Test ride 1",
      date: new Date(),
      verticalAscend: 1200,
      distance: 100,
      attending: 10,
      user: { name: 'Andrew', surname: 'Kemp', pictureUrl: '' } ,
      comments: this.comments
    },
    { 
      id: 2,
      description: "This is my test ride, blah blah Test ride 2",
      date: new Date(),
      verticalAscend: 1200,
      distance: 100,
      attending: 0,
      user: { name: 'Riley', surname: 'Kemp', pictureUrl: '' },
      comments: new Array()
    },
    { 
      id: 3,
      description: "This is my test ride, blah blah Test ride 3",
      date: new Date(),
      verticalAscend: 1200,
      distance: 100,
      attending: 10,
      user: { name: 'Andrew', surname: 'Kemp', pictureUrl: '' },
      comments: new Array() 
    },
    { 
      id: 4,
      description: "This is my test ride, blah blah Test ride 4",
      date: new Date(),
      verticalAscend: 1200,
      distance: 100,
      attending: 10,
      user: { name: 'Andrew', surname: 'Kemp', pictureUrl: '' },
      comments: new Array() 
    },
    { 
      id: 5,
      description: "This is my test ride, blah blah Test ride ",
      date: new Date(),
      verticalAscend: 1200,
      distance: 100,
      attending: 10,
      user: { name: 'Andrew', surname: 'Kemp', pictureUrl: '' } ,
      comments: new Array()
    },
    { 
      id: 6,
      description: "This is my test ride, blah blah Test ride 5",
      date: new Date(),
      verticalAscend: 1200,
      distance: 100,
      attending: 10,
      user: { name: 'Andrew', surname: 'Kemp', pictureUrl: '' } ,
      comments: new Array()
    },
    { 
      id: 7,
      description: "This is my test ride, blah blah Test ride 6",
      date: new Date(),
      verticalAscend: 1200,
      distance: 100,
      attending: 10,
      user: { name: 'Andrew', surname: 'Kemp', pictureUrl: '' } ,
      comments: new Array()
    },
  ];

  constructor(public httpClient: HttpClient) { }

  getEvents(): Observable<Event[]> {
    //return this.http.get<Event[]>(this.feedsUrl);
    return of(this.events);
  }
  getEventByid(eventId: number): Observable<Event> {
    let event = this.events.find(x => x.id === eventId);
    return of(event);
  }
  addEvent(event: Event): void {
    //this represents PrimaryKey in db, so this logic is added only for testing purposes.
    //please remove after hooked up
    event.id = this.events.entries.length + 1;

    if (event !== undefined) {
      this.events.push(event);
    }
  }
  updateEvent(event: Event): void {
    let eventToUpdate = this.events.find(x => x.id === event.id);
    let indexofEvent = this.events.indexOf(eventToUpdate);
    this.events[indexofEvent] = event;
  }
}

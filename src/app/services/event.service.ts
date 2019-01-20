import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';

import { Comment } from '../models/comment';
import { Event } from '../models/event';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private httpClient: HttpClient) {}

   public addNewEvent(event: Event): Observable<HttpResponse<string>> {
      return this.httpClient.post<string>(environment.endpoints.event.addEvent, 
        event, { observe: 'response' });
   }

   public updateEvent(event: Event): Observable<HttpResponse<string>> {
     return this.httpClient.put<string>(environment.endpoints.event.updateEvent, event, { observe: 'response' });
   }

   public readEvents(continuationToken: string, pageSize: number): Observable<HttpResponse<Event[]>> {

     //set parameters
    //  let params = new HttpParams();
    //  params.set("pageSize", pageSize.toString())

    //  let headers = new HttpHeaders();
    //  headers.set('continuationToken', continuationToken);

     var url = environment.endpoints.event.readAllEvents;

     return this.httpClient.get<Event[]>(url, { observe: 'response' });
   }

   public addNewComment(comment: Comment): Observable<HttpResponse<string>> {
      return this.httpClient.post<string>(environment.endpoints.comment.addComment, comment, { observe: 'response' });
   }

   public readAllEventComments(eventId: string): Observable<Comment[]> {
     return this.httpClient.get<Comment[]>(environment.endpoints.comment.GetEventComments + eventId);
   }
}

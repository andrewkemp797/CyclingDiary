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

  public continuationToken: string = null;
  public events: BehaviorSubject<Event[]> = new BehaviorSubject(null);

  constructor(private httpClient: HttpClient) {}

   public addNewEvent(event: Event): Observable<boolean> {
      this.httpClient.post<HttpResponse<boolean>>('', event, { observe: 'response' }).subscribe((resp) => {
       if (resp.ok){
         return true;
       }
     },
     (error) => {
       console.log(error);
       return false;
     });
     //something whent wrong
     return of(false);
   }

   public readEvents(pageSize: number = 20): void {

     //set parameters
     let params = new HttpParams();
     params.set("pageSize", pageSize.toString())

     let headers = new HttpHeaders();
     headers.set('continuationToken', this.continuationToken);

     var url = environment.endpoints.event.readAllEvents + pageSize;

     this.httpClient.get<Event[]>(url, { headers: headers, params: params, observe: 'response'}).subscribe(resp => {
       console.log(resp);
       this.events.next(resp.body);
       this.continuationToken = resp.headers.get('continuationToken');
     },
     error => {
       console.log(error);
     })
   }

   public addNewComment(comment: Comment): Observable<boolean> {
    this.httpClient.post<HttpResponse<boolean>>('', event, { observe: 'response' }).subscribe((resp) => {
     if (resp.ok){
       return true;
     }
   },
   (error) => {
     console.log(error);
     return false;
   });
   //something went wrong
   return of(false);
 }
}

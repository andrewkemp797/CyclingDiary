import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  public auth(user: User): Observable<HttpResponse<string>> {
    return this.http.post<string>(environment.endpoints.auth.authUser, user, { observe: 'response' });
  }
}

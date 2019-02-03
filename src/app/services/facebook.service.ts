import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, NextObserver } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { Guid } from 'guid-typescript';
declare var FB: any;

@Injectable({
  providedIn: 'root'
})
export class FacebookService {

  fbLoginStatus = "";
  fbUser: User;
  // private FB: any;

  constructor() {
    (window as any).fbAsyncInit = function () {
      FB.init({
        appId: '516532178832072',
        cookie: true,
        xfbml: true,
        version: 'v3.2'
      });
      FB.AppEvents.logPageView();
    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  facebookLogin(): Observable<User> {
    return Observable.create((observer: NextObserver<User>) => {
      FB.login((loginResponse) => {
        let user: User = {
          profilePicUrl: '',
          id: Guid.create().toString(),
          name: '',
          surname: '',
          email: ''
        };
        if (loginResponse.status === 'connected') {
          FB.api(
            environment.endpoints.facebook.getUserData + loginResponse.authResponse.accessToken,
            function (dataResponse) {
              if (dataResponse && !dataResponse.error) {
                user.name = dataResponse.first_name,
                  user.surname = dataResponse.last_name,
                  user.email = dataResponse.email;
              }
            }
          );
          //FB query profile pic
          FB.api(
            '/' + loginResponse.authResponse.userID + '/picture?redirect=false',
            'GET',
            {},
            function (profilePicResponse) {
              user.profilePicUrl = profilePicResponse.data.url;

              observer.next(user);
              observer.complete();
            }
          );
        }
        else {
          console.log('User login failed');
        }
      });
    });
  }

  // facebookLogout(): Observable<FacebookAuthResponse> {
  //   return Observable.create((observer: NextObserver<FacebookAuthResponse>) => {

  //     FB.logout((response: FacebookAuthResponse) => {
  //       // add logic to store user in localstorage
  //       this.response = response;
  //       this.fbLoginStatus = response.status;
  //       observer.next(this.response);
  //       observer.complete();
  //     });
  //   });
  // }
}

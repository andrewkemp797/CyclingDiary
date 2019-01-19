import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { Guid } from 'guid-typescript';
import { environment } from 'src/environments/environment';
import { userInfo } from 'os';
declare var FB: any;

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private router: Router) { }

  ngOnInit() {
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

  submitLogin() {
    // FB.login();
    FB.login((loginResponse) => {
      let user: User = { 
        profilePicUrl: '', 
        id: Guid.create().toString(), 
        name: '', 
        surname: '', 
        email: '' 
      };
      console.log('submitLogin', loginResponse);
      if (loginResponse.status === 'connected') {
        console.log(loginResponse.authResponse.accessToken);
        //FB query user data
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
          function(profilePicResponse) {
            user.profilePicUrl = profilePicResponse.data.url;
          }
        );
        console.log('final user:', user);
        this.router.navigate(['/feed']);
      }
      else {
        console.log('User login failed');
      }
    });

  }
}

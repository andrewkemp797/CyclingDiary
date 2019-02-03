import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { Guid } from 'guid-typescript';
import { environment } from 'src/environments/environment';
import { userInfo } from 'os';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { FacebookService } from 'src/app/services/facebook.service';
declare var FB: any;

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userSubject = new Subject<User>();

  constructor(private router: Router, private authService: AuthService, private facebookService: FacebookService) { }

  ngOnInit() {
    
  }

  submitLogin() {
    this.facebookService.facebookLogin().subscribe(u => {
      this.authService.auth(u).subscribe(resp => {
        if (resp.ok) {
          localStorage.setItem('jwt', resp.body);
          this.router.navigateByUrl('/feed')
        } else {
          console.log('Could not successfully log user in');
        }
      })
    })
  }
}

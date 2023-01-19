import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {


  constructor(private authService: AuthService, private router: Router) { }

  onLogin() {
    this.authService.login() // enabling this boolean in the service to true will allow the next line to work
    this.router.navigateByUrl('/places/discover')
  }


  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { format } from 'path';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

  isLoading = false;
  isLogin = true

  onLogin() {
    this.isLoading = true;
    this.authService.login(); // enabling this boolean in the service to true will allow the next line to work
    this.loadingCtrl // this loading controller is a lot more smart than just rendering a spinner based on a boolean value
      .create({ keyboardClose: true, message: 'Logging in...' })
      .then((loadingEl) => {
        loadingEl.present(); // PRESENTING IT
        setTimeout(() => { // we're faking a network request here.
          this.isLoading = false;
          loadingEl.dismiss() // DISMISSING IT
          this.router.navigateByUrl('/places/discover');
        }, 500);
      });
  }

  onSubmit(f: NgForm) {
    // console.log(f.form.value)
    if (!f.valid) return
    const email = f.value.email
    const password = f.value.password
    console.log(email, password)

    if (this.isLogin) {
      // Send a request to login servers
    } else {
      // Send a request to signup servers
    }
  }

  onSwitchAuthMode() {
    this.isLogin = !this.isLogin
  }

  ngOnInit() {}
}

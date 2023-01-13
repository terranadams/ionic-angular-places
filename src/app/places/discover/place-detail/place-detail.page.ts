import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {

  constructor(private router: Router, private navCtrl: NavController) { }

  ngOnInit() {
  }

  onBookPlace() {
    console.log('place booked')
    // this.router.navigateByUrl('/places/discover')
    this.navCtrl.navigateBack('/places/discover') // This is to get the correct page transfer animation Ionic is meant to be used for
    // this.navCtrl.pop() // This would also work, but if the app is refreshed on the details page, the "Book" button wouldn't take you
    // anywhere since the page stack is now empty. This would be the use case if it were a native mobile app, since you can't refresh the app in the same manner. 
  }

}

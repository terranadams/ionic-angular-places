import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { CreateBookingComponent } from 'src/app/bookings/create-booking/create-booking.component';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
  place!: any;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private placesService: PlacesService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap) {
        this.navCtrl.navigateBack('/places/offers');
        return;
      }
      let paramPlaceID = paramMap.get('placeId')?.toString(); // trying to pass this in as a string to get the next line to work
      this.place = this.placesService.getPlace(paramPlaceID);
      console.log(this.place);
    });
  }

  onBookPlace() {
    // this.router.navigateByUrl('/places/discover')
    // this.navCtrl.navigateBack('/places/discover'); // This is to get the correct page transfer animation Ionic is meant to be used for
    // this.navCtrl.pop() // This would also work, but if the app is refreshed on the details page, the "Book" button wouldn't take you
    // anywhere since the page stack is now empty. This would be the use case if it were a native mobile app, since you can't refresh the app in the same manner.
    this.modalCtrl
      .create({
        component: CreateBookingComponent,
        componentProps: { selectedPlace: this.place },
      }) // you can configure this by adding things to this object (like for animating and css)
      .then((modalEl) => {
        modalEl.present();
        return modalEl.onDidDismiss() // returning this allows us to chain a promise
      })
      .then(resultData => {
        console.log(resultData.data, resultData.role) // this tells the console if the modal was booked or just closed
        if (resultData.role === 'confirm') console.log('Booked :)')
      })
  }
}

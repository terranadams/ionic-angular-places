import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ActionSheetController,
  LoadingController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { Subscription } from 'rxjs';
import { BookingService } from 'src/app/bookings/booking.service';
import { CreateBookingComponent } from 'src/app/places/discover/create-booking/create-booking.component';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit, OnDestroy {
  place!: any;
  placeSub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private placesService: PlacesService,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private bookingService: BookingService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap) {
        this.navCtrl.navigateBack('/places/offers');
        return;
      }
      //  this.place = this.placesService.getPlace(paramMap.get('placeId')?.toString()); // old logic pre subject
      this.placeSub = this.placesService
        .getPlace(paramMap.get('placeId'))
        .subscribe((place) => {
          this.place = place;
        });
    });
  }

  onBookPlace() {
    // this.router.navigateByUrl('/places/discover')
    // this.navCtrl.navigateBack('/places/discover'); // This is to get the correct page transfer animation Ionic is meant to be used for
    // this.navCtrl.pop() // This would also work, but if the app is refreshed on the details page, the "Book" button wouldn't take you
    // anywhere since the page stack is now empty. This would be the use case if it were a native mobile app, since you can't refresh the app in the same manner.
    this.actionSheetCtrl
      .create({
        header: 'Choose an Action',
        buttons: [
          {
            text: 'Select Date Manually',
            handler: () => {
              this.openBookingModal('select');
            },
          },
          {
            text: 'Get Random Dates',
            handler: () => {
              this.openBookingModal('random');
            },
          },
          {
            text: 'Cancel',
            role: 'cancel', // different roles do different things to the buttons
          },
        ],
      })
      .then((actionSheetEl) => actionSheetEl.present());
  }

  openBookingModal(mode: 'select' | 'random') {
    // this function will only accept either of these two specific values
    console.log(mode);
    this.modalCtrl
      .create({
        component: CreateBookingComponent,
        componentProps: { selectedPlace: this.place, selectedMode: mode },
      }) // you can configure this by adding things to this object (like for animating and css)
      .then((modalEl) => {
        modalEl.present();
        return modalEl.onDidDismiss(); // putting a return in this allows us to chain a promise
      })
      .then((resultData) => {
        // this doesn't get ran 'til the form is submitted, window closes, and we have our info
        // console.log(resultData.data, resultData.role);

        if (resultData.role === 'confirm') {
          this.loadingCtrl
            .create({ message: 'Booking place...' })
            .then((loadingEl) => {
              loadingEl.present();
              const data = resultData.data.bookingData;
              this.bookingService
                .addBooking(
                  this.place.id,
                  this.place.title,
                  this.place.imageUrl,
                  data.firstName,
                  data.lastName,
                  data.guestNumber,
                  data.startDate,
                  data.endDate
                )
                .subscribe(() => {
                  loadingEl.dismiss();
                });
            });
        }
      });
  }

  ngOnDestroy(): void {
    if (this.placeSub) this.placeSub.unsubscribe();
  }
}

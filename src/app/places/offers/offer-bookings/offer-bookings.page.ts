import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit {
  place!: any;

  constructor(private route: ActivatedRoute, private navCtrl: NavController, private placesService: PlacesService) {}

  ngOnInit() {
    // this will keep listening for changes even when not on this page
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap) {
        this.navCtrl.navigateBack('/places/offers');
        return;
      }
      let paramPlaceID = paramMap.get('placeId')?.toString() // trying to pass this in as a string to get the next line to work
      this.place = this.placesService.getPlace(paramPlaceID)
      console.log(this.placesService.getPlace(paramPlaceID))
    });
  }
}

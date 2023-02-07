import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../place.model';
import { IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, OnDestroy {
  offers!: Place[];

  private placesSub!: Subscription

  onEdit(offerId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate(['/', 'places', 'offers', 'edit', offerId]);
    console.log('Editing Item: ', offerId);
  }

  constructor(private placesService: PlacesService, private router: Router) {}

  ngOnInit() {
    // this.offers = this.placesService.places; // old logic pre subject added
    this.placesSub = this.placesService.places.subscribe(places => {
      this.offers = places
    })
  }

  ionViewWillEnter() {// this makes it so this runs every time the component shows up, instead of when it loads for just the first time
    this.placesService.fetchPlaces().subscribe(resData => console.log(resData))
  }

  ngOnDestroy(): void {
    if (this.placesSub) {
      this.placesSub.unsubscribe()
    }
  }
}

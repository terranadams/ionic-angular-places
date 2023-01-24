import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../place.model';
import { IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
  offers!: Place[];

  onEdit(offerId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate(['/', 'places', 'offers', 'edit', offerId]);
    console.log('Editing Item: ', offerId);
  }

  constructor(private placesService: PlacesService, private router: Router) {}

  ngOnInit() {
    this.offers = this.placesService.places;
  }
}

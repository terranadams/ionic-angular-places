import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuController, SegmentChangeEventDetail } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
  loadedPlaces!: Place[];
  listedLoadedPlaces!: Place[];
  private placesSub!: Subscription;

  constructor(
    private placesService: PlacesService,
    private menuCtrl: MenuController
  ) {}

  ngOnInit() {
    this.placesService.places.subscribe(places => {
      this.loadedPlaces = places
      this.listedLoadedPlaces = this.loadedPlaces.slice(1)
    })
  }

  onOpenMenu() {
    this.menuCtrl.toggle();
  }

  onFilterUpdate(event: any) {
    console.log(event.detail);
  }

  ngOnDestroy() {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }
}

import { Injectable } from '@angular/core';
import { Place } from './place.model';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private _places: Place[] = [
    new Place(
      'p1',
      'Manhattan Mansion',
      'In the heart of New York City',
      'https://www.christiesrealestate.com/blog/wp-content/uploads/2022/05/RESIZED-hall-with-stairs-and-chandelier-220323_EJ_123_e_35_TH_0085-Edit_MEDIUM_RES.jpg',
      149.99,
      new Date('2019-01-01'),
      new Date('2019-12-31')
    ),
    new Place(
      'p2',
      'Amour Toujours',
      'A romantic place in Paris',
      'https://d36vnx92dgl2c5.cloudfront.net/cache/prod/Danielfeau/1/media/b3751c24c76ef4d28b5108ea49c9fdab.jpg',
      219.99,
      new Date('2019-01-01'),
      new Date('2019-12-31')
    ),
    new Place(
      'p3',
      'Pine Tree Lane',
      'Pinacle of Nature',
      'https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/fall-in-hobble-creek-kim-maclachlan.jpg',
      999.99,
      new Date('2019-01-01'),
      new Date('2019-12-31')
    ),
  ];

  get places() {
    return [...this._places];
  }

  getPlace(id: any) {
    return {...this._places.find(p => p.id === id)} // making and sending a clone using the spread operator and curleys
  }

  constructor() {}
}

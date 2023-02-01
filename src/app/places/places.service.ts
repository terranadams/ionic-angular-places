import { Injectable } from '@angular/core';
import { BehaviorSubject, take, map, tap, delay } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Place } from './place.model';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private _places = new BehaviorSubject<Place[]>([
    new Place(
      'p1',
      'Manhattan Mansion',
      'In the heart of New York City',
      'https://www.christiesrealestate.com/blog/wp-content/uploads/2022/05/RESIZED-hall-with-stairs-and-chandelier-220323_EJ_123_e_35_TH_0085-Edit_MEDIUM_RES.jpg',
      149.99,
      new Date('2023-01-01'),
      new Date('2023-12-31'),
      'abc'
    ),
    new Place(
      'p2',
      'Amour Toujours',
      'A romantic place in Paris',
      'https://d36vnx92dgl2c5.cloudfront.net/cache/prod/Danielfeau/1/media/b3751c24c76ef4d28b5108ea49c9fdab.jpg',
      219.99,
      new Date('2023-01-01'),
      new Date('2023-12-31'),
      'def'
    ),
    new Place(
      'p3',
      'Pine Tree Lane',
      'Pinacle of Nature',
      'https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/fall-in-hobble-creek-kim-maclachlan.jpg',
      999.99,
      new Date('2023-01-01'),
      new Date('2023-12-31'),
      'abc'
    ),
  ]);

  constructor(private authService: AuthService) {}

  get places() {
    // return [...this._places]; // this was before our subject was added
    return this._places.asObservable();
  }

  getPlace(id: any) {
    // return {...this._places.find(p => p.id === id)} // making and sending a clone using the spread operator and curleys
    return this.places.pipe(
      take(1),
      map((places) => {
        return { ...places.find((p) => p.id === id) };
      })
    ); // we just want to return a single observable, which is what this gives us
  }

  addPlace(
    title: string,
    description: string,
    price: number,
    dateFrom: Date,
    dateTo: Date
  ) {
    const newPlace = new Place(
      Math.random().toString(),
      title,
      description,
      'https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/fall-in-hobble-creek-kim-maclachlan.jpg',
      price,
      dateFrom,
      dateTo,
      this.authService.userId
    );
    // this._places.push(newPlace) // this was before our subject was added
    // the take(1) operator ensures we only get one observable, and then cancel the subscription
    // since we're using a loader control, we put a return to return the full observable, and put the subscribe callback in this tap() operator
    return this._places.pipe(
      take(1),
      delay(1000), // this helps us somehow, see lesson 192
      tap((places) => {
        setTimeout(() => {
          this._places.next(places.concat(newPlace)); // this next() is how we update our state, and emit it outward
        });
      })
    );
  }

  updatePlace(placeId: string, title: string, description: string) {
    // we could subscribe to places here, but we want to return this subscription so
    // we can listen to it in our edit-offer page
    return this.places.pipe(
      take(1),
      delay(1000),
      tap((places) => {
        const updatedPlaceIndex = places.findIndex(
          (place) => place.id === placeId
        );
        const updatedPlaces = [...places]; // we copy the old places to make sure we don't mutate any old state in an unwanted way
        const oldPlace = updatedPlaces[updatedPlaceIndex];
        updatedPlaces[updatedPlaceIndex] = new Place(
          oldPlace.id,
          title,
          description,
          oldPlace.imageUrl,
          oldPlace.price,
          oldPlace.availableFrom,
          oldPlace.availableTo,
          oldPlace.userId
        );
        this._places.next(updatedPlaces) // we're emitting the new list of places
      })
    );
  }
}

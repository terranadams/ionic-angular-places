import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Place } from 'src/app/places/place.model';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  @Input() selectedPlace!: Place;
  @Input() selectedMode!: 'select' | 'random';
  startDate!: string;
  endDate!: string;

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel'); // this dismisses the nearest modal, can also pass data and specify an id for the modal like we're doing here with the word 'cancel'
  }

  onBookPlace() {
    this.modalCtrl.dismiss({ message: 'This is a dummy messae!' }, 'confirm'); // passing data and giving an ID to the modal
    // the data gets caught in the place-detail ts file where the modal is defined
    // we then do whatever we want with said data
  }

  ngOnInit() {
    const availableFrom = new Date(this.selectedPlace.availableFrom);
    const availableTo = new Date(this.selectedPlace.availableTo);
    if (this.selectedMode === 'random') {
      this.startDate = new Date(
        availableFrom.getTime() +
          Math.random() *
            (availableTo.getTime() -
              7 * 24 * 60 * 1000 -
              availableFrom.getTime())
      ).toISOString(); // this makes the random dates within a week of eachother

      this.endDate = new Date(
        new Date(this.startDate).getTime() +
          Math.random() *
            (new Date(this.startDate).getTime() +
              6 * 24 * 60 * 60 * 1000 -
              new Date(this.startDate).getTime())
      ).toISOString();
    }
  }
}

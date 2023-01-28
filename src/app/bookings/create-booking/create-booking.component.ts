import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  @ViewChild('f', {static: true}) form!: NgForm // this is angular, lets us get values from a local reference
  startDate!: string;
  endDate!: string;

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel'); // this dismisses the nearest modal, can also pass data and specify an id for the modal like we're doing here with the word 'cancel'
  }

  // we're obtaining data from the form with this func
  onBookPlace() {
    // if (!this.form.valid || this.datesValid()) return; // idk why this wont work lol
    this.modalCtrl.dismiss({ bookingData: {
      firstName: this.form.value['first-name'],
      lastName: this.form.value['last-name'],
      guestNumber: this.form.value['guest-number'],
      startDate: this.form.value['date-from'],
      endDate: this.form.value['date-to']
    } }, 'confirm'); // passing data and giving an ID to the modal
    // the data gets caught in the place-detail ts file where the modal is defined
    // we then do whatever we want with said data
  }

  // we validatin' our dates manually hur
  datesValid() {
    const startDate = new Date(this.form.value['date-from'])
    const endDate = new Date(this.form.value['date-to'])
    return endDate > startDate // simple enough. If this comes  out false, then nothing happens
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

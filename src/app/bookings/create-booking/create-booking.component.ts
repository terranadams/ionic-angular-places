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

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel'); // this dismisses the nearest modal, can also pass data and specify an id for the modal like we're doing here with the word 'cancel'
  }

  onBookPlace() {
    this.modalCtrl.dismiss({message: 'This is a dummy messae!'}, 'confirm'); // passing data and giving an ID to the modal
    // the data gets caught in the place-detail ts file where the modal is defined
    // we then do whatever we want with said data
  }

  ngOnInit() {}
}

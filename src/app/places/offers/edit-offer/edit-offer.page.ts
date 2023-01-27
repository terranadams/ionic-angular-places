import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {
  place!: any;
  form!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private placesService: PlacesService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap) {
        this.navCtrl.navigateBack('/places/offers');
        return;
      }
      // let paramPlaceID = paramMap.get('placeId')?.toString() // trying to pass this in as a string to get the next line to work
      this.place = this.placesService.getPlace(
        paramMap.get('placeId')?.toString()
      );
      this.form = new FormGroup({
        title: new FormControl(this.place.title, {
          updateOn: 'blur', // when it loses focus
          validators: [Validators.required], // this makes sure that the title is required
        }), // the object holds the configs for this particular control
        description: new FormControl(this.place.description, {
          updateOn: 'blur',
          validators: [Validators.required, Validators.maxLength(180)],
        }),
      });
    });
  }

  onUpdateOffer() {
    if (!this.form.valid) return
    console.log(this.form.value)
  }
}

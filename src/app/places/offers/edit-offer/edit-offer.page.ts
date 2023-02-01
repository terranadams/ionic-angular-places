import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit, OnDestroy {
  place!: any;
  form!: FormGroup;
  placeSub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private placesService: PlacesService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap) {
        this.navCtrl.navigateBack('/places/offers');
        return;
      }
      this.placeSub = this.placesService
        .getPlace(paramMap.get('placeId'))
        .subscribe((place) => {
          this.place = place;
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
    });
  }

  onUpdateOffer() {
    if (!this.form.valid) return;
    // console.log(this.form.value);
    this.loadingCtrl.create({
      message: 'Updating place...'
    }).then(loadingEl => {
      loadingEl.present()
      this.placesService.updatePlace(
      this.place.id,
      this.form.value.title,
      this.form.value.description, // this is a one time self destroying observable
    ).subscribe(() => {
      loadingEl.dismiss()
      this.form.reset()
      this.router.navigate(['/places/offers'])
    })
    })

  }

  ngOnDestroy(): void {
    if (this.placeSub) this.placeSub.unsubscribe();
  }
}

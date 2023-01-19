import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlaceDetailPageRoutingModule } from './place-detail-routing.module';

import { PlaceDetailPage } from './place-detail.page';
import { CreateBookingComponent } from 'src/app/bookings/create-booking/create-booking.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlaceDetailPageRoutingModule
  ],
  declarations: [PlaceDetailPage, CreateBookingComponent], // components you make in your ionic app (using ionic web components) must be declared in order to be used apparently.
  //Since this is the only module we need it in, it'll be declared here.
  entryComponents: [CreateBookingComponent] // This lets anggular know that this will eventually be created programmatically, though it appears to work without it in this version.
})
export class PlaceDetailPageModule {}

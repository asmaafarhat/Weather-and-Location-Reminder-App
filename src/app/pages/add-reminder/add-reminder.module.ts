import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddReminderPageRoutingModule } from './add-reminder-routing.module';

import { AddReminderPage } from './add-reminder.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddReminderPageRoutingModule
  ],
  declarations: [AddReminderPage]
})
export class AddReminderPageModule {}

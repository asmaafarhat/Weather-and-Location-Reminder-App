import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AuthService } from 'src/app/services/auth.service';
import { ReminderService, Reminder } from 'src/app/services/reminder.service';

@Component({
  selector: 'app-add-reminder',
  templateUrl: './add-reminder.page.html',
  styleUrls: ['./add-reminder.page.scss'],
})
export class AddReminderPage {

  reminderForm: FormGroup;
  photo?: string;

  constructor(
    private formBuilder: FormBuilder,
    private reminderService: ReminderService,
    private authService: AuthService,
    private router: Router
  ) {
    this.reminderForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['']
    });
  }

  async takePhoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Base64, // or DataUrl if you prefer
        source: CameraSource.Camera
      });
      this.photo = `data:image/jpeg;base64,${image.base64String}`;
    } catch (error) {
      console.error('Camera Error: ', error);
    }
  }

  async addReminder() {
    if (this.reminderForm.valid) {
      const reminder: Reminder = {
        id: Date.now(),
        title: this.reminderForm.value.title,
        description: this.reminderForm.value.description,
        photo: this.photo,
        dateCreated: new Date()
      };

      await this.reminderService.addReminder(reminder);
      this.router.navigate(['/reminders']);
    }
  }

  back() {
    this.router.navigate(['/home']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}

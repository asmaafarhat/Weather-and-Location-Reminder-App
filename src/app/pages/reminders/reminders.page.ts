import { Component } from '@angular/core';
import { Reminder, ReminderService } from '../../services/reminder.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.page.html',
  styleUrls: ['./reminders.page.scss'],
})
export class RemindersPage {

  reminders$ = this.reminderService.reminders$;

  constructor(
    private reminderService: ReminderService,
    private authService: AuthService,
    private router: Router
  ) { }

  ionViewWillEnter() {
    // This method is called every time the page becomes active
    console.log('Reminders page loaded.');
  }

  async refreshData(event: any) {
    const savedReminders = JSON.parse(localStorage.getItem('reminders') || '[]');
    const remindersSubject = new BehaviorSubject<Reminder[]>([]);
    remindersSubject.next(savedReminders);
    this.reminders$ = remindersSubject.asObservable();
    event.target.complete(); // Stop the refresher
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  back() {
    this.router.navigate(['/home']);
  }

}

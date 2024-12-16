import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalNotifications } from '@capacitor/local-notifications';

export interface Reminder {
  id: number;
  title: string;
  description?: string;
  photo?: string;
  dateCreated: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ReminderService {

  private remindersSubject = new BehaviorSubject<Reminder[]>([]);
  reminders$ = this.remindersSubject.asObservable();

  constructor() {
    // Load saved reminders from local storage
    const savedReminders = JSON.parse(localStorage.getItem('reminders') || '[]');
    this.remindersSubject.next(savedReminders);
  }

  async addReminder(reminder: Reminder) {
    const currentReminders = this.remindersSubject.getValue();
    const updatedReminders = [...currentReminders, reminder];
    this.remindersSubject.next(updatedReminders);
    localStorage.setItem('reminders', JSON.stringify(updatedReminders));

    // Schedule a local notification
    await this.scheduleNotification(reminder);
  }

  // Schedule a local notification for the new reminder
  private async scheduleNotification(reminder: Reminder) {
    const randomId = Math.floor(Math.random() * 1000000);
    await LocalNotifications.schedule({
      notifications: [
        {
          id: randomId,
          title: 'New Reminder Added!',
          body: `Reminder: ${reminder.title}`,
          schedule: { at: new Date(new Date().getTime() + 1000) }, // 1 second from now
          smallIcon: 'ic_stat_icon',
          attachments: reminder.photo ? [{ id: 'image', url: reminder.photo }] : []
        }
      ]
    });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Geolocation } from '@capacitor/geolocation';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) {}

  async getCurrentWeather() {
    const permissionStatus = await Geolocation.checkPermissions();

    if (permissionStatus.location !== 'granted') {
      console.error('Location permission denied');
      await Geolocation.requestPermissions();
      return;
    }

    const coords = await Geolocation.getCurrentPosition();

    if (coords && coords.coords) {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.coords.latitude}&lon=${coords.coords.longitude}&appid=${this.apiKey}`;
      return this.http.get(url);
    } else {
      console.error('Location data is not available');
      return;
    }
  }
}

import { Component } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  weather: any;

  constructor(private weatherService: WeatherService) {}

  async ionViewWillEnter() {
    (await this.weatherService.getCurrentWeather())?.subscribe(
      data => this.weather = data,
      error => console.error('Error fetching weather:', error)
    );
  }

}

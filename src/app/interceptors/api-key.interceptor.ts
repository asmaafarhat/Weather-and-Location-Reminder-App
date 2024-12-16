import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class apiKeyInterceptor implements HttpInterceptor {

  private apiKey = environment.apiKey;

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Check if the request is going to the OpenWeather API
    if (request.url.includes('api.openweathermap.org')) {
      // Clone the request to add the API key as a query parameter
      const clonedRequest = request.clone({
        setParams: {
          appid: this.apiKey
        }
      });
      return next.handle(clonedRequest);
    }

    // If it's not an OpenWeather request, just pass it through
    return next.handle(request);
  }
}

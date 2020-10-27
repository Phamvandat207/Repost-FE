import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '@app/_service';
import {environment} from '../../environments/environment';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const user = this.authenticationService.userValue;
    const isLoggedIn = user && user.authdata;
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    if (isLoggedIn && isApiUrl){
      request = request.clone({
        setHeaders: {
          Authorization: `Basic ${user.authdata}`
        }
      });
    }
    return next.handle(request);
  }
}

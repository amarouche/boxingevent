import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  private authService: AuthService;

  constructor(private injector: Injector) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authService = this.injector.get(AuthService);
    const token: string = this.authService.getToken();
    req = req.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*'
      }
    });
    return next.handle(req);
  }
}
 /*
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  private authService: AuthService;

  constructor(private router: Router, private injector: Injector) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .catch((response: any) => {
        if (response instanceof HttpErrorResponse && response.status === 401) {
          this.authService = this.injector.get(AuthService);
          this.authService.removeToken();
          this.router.navigateByUrl('/log-in');
          console.log(response);
        }
        return Observable.throw(response);
      });
  }

}
*/

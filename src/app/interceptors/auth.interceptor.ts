import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, flatMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private authPath: string = '/auth';

    constructor(
        private _router: Router,
        private http: HttpClient
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        let token = localStorage.getItem('api-token');

        if (token) {
            req = req.clone();
        }

        return next.handle(req).pipe(
            catchError(err => {
                console.log(err);
                if (err.status === 401) {
                    //Genrate params for token refreshing
                    let params = {
                        apiKey: token,
                    };
                    return this.http.post(`${environment.api}${this.authPath}/refresh`, params).pipe(
                        flatMap(
                            (data: any) => {
                                //If reload successful update tokens
                                if (data.status == 200) {
                                    //Update tokens
                                    console.log(data)
                                    localStorage.setItem("api-token", data.result.token);
                                    localStorage.setItem("refreshToken", data.result.refreshToken);
                                    //Clone our fieled request ant try to resend it
                                    // req = req.clone({
                                    //   setHeaders: {
                                    //     'api-token': data.result.token
                                    //   }
                                    // });
                                    return next.handle(req).pipe(
                                        catchError((err) => {
                                            return throwError(err);
                                            // catch another error
                                        })
                                    )
                                }else {
                                    //Logout from account
                                }
                            }
                        )
                    )
                }
                return Observable.throw(err);
            })
        )

      
    }
}
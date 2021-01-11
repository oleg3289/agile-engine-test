import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { mergeMap, tap, map, switchMap } from 'rxjs/operators';
import { AppStorageService } from '../services/appStorage.service';

@Injectable()
export class ImagesResolver implements Resolve<boolean>{

    constructor(
        private router: Router,
        private AS: AppStorageService
        ){}

    resolve(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {

        if (this.AS.isImagesReady) return true
        else {
            return of(true).pipe(
                mergeMap(() => this.AS.getFirstPageImages()),
                switchMap(() => this.AS.getRestImages()),
                tap(() => console.log(this.AS.pictures)),
                map(() => true)
            )
        }

    }
}
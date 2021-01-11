import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { mergeMap, tap, map, switchMap } from 'rxjs/operators';
import { ImageDetails } from '../models/imageDetails';
import { AppStorageService } from '../services/appStorage.service';

@Injectable()
export class ImageDetailsResolver implements Resolve<ImageDetails> {

    constructor(
        private router: Router,
        private AS: AppStorageService
        ){}

    resolve(route: ActivatedRouteSnapshot): Observable<ImageDetails> {

        const PICTURE_ID: string = route.params.id;

        return of(true).pipe(
            mergeMap(() => this.AS.getPicutreById(PICTURE_ID)),
            tap(() => {
                this.AS.isPicDetailsReady = true
            }),
            map((res) => res)
        )

    }
}
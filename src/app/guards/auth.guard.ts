import { Injectable } from "@angular/core";
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable, of} from "rxjs";
import { map, mergeMap, tap } from "rxjs/operators";
import { AppStorageService } from "../services/appStorage.service";
 
@Injectable()
export class AboutGuard implements CanActivate {

    constructor(
        private AS: AppStorageService
    ) {}
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean {
         
        return of(true).pipe(
            mergeMap(() => this.AS.getAuthToken()),
            map(() => {
                if (localStorage.getItem('api-token')) {
                    
                    return true;

                } else return false
            })
        )
    }
}
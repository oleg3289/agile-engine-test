import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { forkJoin, merge, Observable, of } from "rxjs";
import { map, mergeMap, tap } from "rxjs/operators";
import { IImageDetails } from "../interfaces/iImageDetails";
import { IImagesData } from "../interfaces/iImagesData";
import { IToken } from "../interfaces/iToken";
import { Image } from "../models/image";
import { ImageDetails } from "../models/imageDetails";
import { ImagesData } from "../models/imagesData";
import { Token } from "../models/token";
import { GetService } from "./get.service";

@Injectable()
export class AppStorageService {
    private apiKey: string = '23567b218376f79d9415';
    public isPicDetailsReady: boolean = false;
    public isImagesReady: boolean = false;

    private authPath: string = '/auth';
    private imagesPath: string = '/images';

    public headers: HttpHeaders;

    public picDetails: Image = null;
    public pictures: Image[] = [];

    private imagesRequests: any = [];

    constructor(
        private GS: GetService,
    ) {}

    public getAuthToken(): Observable<boolean> {
        return of(true).pipe(
            mergeMap(() => this.GS.getAuthToken<Token, IToken>(this.authPath, this.apiKey, Token).pipe(
                tap((res: Token) => {
                    localStorage.setItem('api-token', res.token);
                }),
                map(() => true)
            ))
        )
    }

    public getFirstPageImages(): Observable<boolean> {
        if (!localStorage.getItem('api-token')) return;

        this.setHeaders();

        return of(true).pipe(
            mergeMap(() => this.GS.getImagesByPage<ImagesData, IImagesData>(this.imagesPath, this.headers, ImagesData, 1).pipe(
                map((res: ImagesData) => {
                    this.pictures.push(...res.pictures);

                    return res.pageCount
                }),
                tap((count) => {

                    // the first page of images we already have
                    // so let get the rest
                    for (let i = 2; i <= count; i++) {
                        this.imagesRequests.push( this.GS.getImagesByPage<ImagesData, IImagesData>(this.imagesPath, this.headers, ImagesData, i));
                    }
                }),
                map(() => true)
            ))
        )
    }

    public getRestImages(): Observable<boolean> {
        if (!localStorage.getItem('api-token')) return;

        return forkJoin(this.imagesRequests).pipe(
            map((res: ImagesData[]) => {
                res.forEach(data => {
                    this.pictures.push(...data.pictures);
                });
            }),
            tap(() => this.isImagesReady = true),
            map(() => true)
        )
    }

    public getPicutreById(picId: string): Observable<ImageDetails> {
        if (!localStorage.getItem('api-token')) return;

        this.setHeaders();

        return this.GS.getPictureById<ImageDetails, IImageDetails>(this.imagesPath, this.headers, ImageDetails, picId);
    }

    ////////////////////////////////// PRIVATE METHODS //////////////////////////////   
    private setHeaders(): void {
        this.headers = new HttpHeaders()
            .set( 'Content-Type', 'application/json' )
            .set( "Authorization", localStorage.getItem('api-token') )
    }
}
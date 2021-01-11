import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable()
export class GetService {

    constructor(
        private http: HttpClient
    ) {}

    public getAuthToken<T extends I, I>(authPath: string, apiKey: string, c: {new(i: I) : T}): Observable<T> {
        return this.http.post<I>(`${environment.api}${authPath}`, { "apiKey": apiKey }).pipe(
            map((res: I) => {
                return <T> new c(res);
            }),
            catchError((err) => {
                this.logErr(err)
                return of(null)
            })
        )
    }

    public getImagesByPage<T extends I, I>(imagesPath: string, headers: HttpHeaders, c: {new(i: I) : T}, page: number): Observable<T> {
        return this.http.get(`${environment.api}${imagesPath}`, { params: { page: page.toString() }, headers: headers } ).pipe(
            map((res: I) => {
                return <T> new c(res);
            }),
            catchError((err) => {
                this.logErr(err)
                return of(null)
            })
        )
    }

    public getPictureById<T extends I, I>(imagesPath: string, headers: HttpHeaders, c: {new(i: I) : T}, picId: string): Observable<T> {
        return this.http.get(`${environment.api}${imagesPath}/${picId}`, { headers: headers } ).pipe(
            map((res: I) => {
                return <T> new c(res);
            }),
            catchError((err) => {
                this.logErr(err)
                return of(null)
            })
        )
    }

    // Error Handler
    public logErr(err: Error): void {
        console.log(`GetService: `, err)
    }
}
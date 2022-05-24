import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable,catchError,throwError } from "rxjs";
import { map } from "rxjs/operators";


@Injectable()
export class ConnectionService{

    private _url="";

    constructor(private _httpClient:HttpClient ){ };

    login(user:any):Observable<any>{
        return this._httpClient.post<any>(this._url,user);
    };

    register(user:any):Observable<any>{
        return this._httpClient.post<any>(this._url,user).pipe(
            map(data => { return data; }),
            catchError(error => throwError(error.message || "Error In The Server !"))
        );
    };

}
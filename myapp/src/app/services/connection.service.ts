import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable,catchError,throwError } from "rxjs";
import { map } from "rxjs/operators";
import { IUser } from "../interfaces/IUser";


@Injectable({providedIn : 'root'})
export class ConnectionService{

    private _url = "https://localhost:44331/api/Login/";

    constructor(private _httpClient : HttpClient){ };

    login(user:any):Observable<any>{
        return this._httpClient.post<any>(this._url+'login',user,{
            headers:this.headers
        });
    };

    register(user:any):Observable<IUser>{
        return this._httpClient.post<IUser>(this._url+'signup',user,{
            headers:this.headers,
        }).pipe(
            map(data => { return data; }),
            catchError(error => throwError(error.message || "Error In The Server !"))
        );
    };

    public headers = new HttpHeaders(
        {
            'Content-Type':'application/json',
            'Accept':'application/json',
            'Access-Control-Allow-Origin':'https://localhost:44331',
            'Access-Control-Allow-Credentials':'true',
            //'Authorization':'Bearer token'
        }
    );

}
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError,throwError, Observable } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class ApiService {

    constructor(private htppClient : HttpClient) { }

    url="https://fakestoreapi.com/products";
    
    getMarques(){
        return this.htppClient.get<any>(this.url).pipe(map((res:any) => { return res; }));
    };

}

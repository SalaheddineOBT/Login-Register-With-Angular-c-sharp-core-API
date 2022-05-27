import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {

    constructor(private apiService : ApiService) { }

    data:any=null;

    ngOnInit():void {
        this.apiService.getMarques().subscribe(res => this.data = res,err => console.log(err.message));
        
    }

}

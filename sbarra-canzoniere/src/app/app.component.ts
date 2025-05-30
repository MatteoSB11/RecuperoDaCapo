import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Canzoni } from './models/song.model';
import { HttpClient } from '@angular/common/http';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sbarra-canzoniere';
  data! : Object
  loading! : boolean
  obs! : Observable<Object>
  vettCanzoni! : Canzoni[];
  obsCanzoni! : Observable<Canzoni[]>

  constructor(public http : HttpClient){}

  makeRichiesta() : void{
    this.loading = true;
    this.obs = this.http.get<Canzoni[]>('https://my-json-server.typicode.com/malizia-g/hotel/short-songlist');
    this.obs.subscribe(this.getData);
  }
  getData = (d : Object) => {
    this.data = d;
    this.loading = false;
  }
  makeTypedRequest() : void {
  this.obsCanzoni = this.http.get<Canzoni[]>('https://my-json-server.typicode.com/malizia-g/hotel/short-songlist'); 
  this.obsCanzoni.subscribe(data => {
      this.vettCanzoni = data;
      console.log("Dati canzoni caricati:", this.vettCanzoni); 
  });
 }
}

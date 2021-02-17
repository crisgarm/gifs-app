import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey: string = 'Ju4IzB8dNE9YOjsVGZeYQX5pqEUxaTq3';
  private _browsingHistory: string[] = [];

  get browsingHistory() {
    return [...this._browsingHistory];
  }

  constructor(private http: HttpClient) {}

  searchGifs(query: string) {
    query = query.trim().toLowerCase();
    if (!this._browsingHistory.includes(query)) {
      //validamos si el valor ya está introducido.
      this._browsingHistory.unshift(query); //Si no lo está, lo añado al array
      this._browsingHistory = this._browsingHistory.splice(0, 10); //Y hago el corte hasta 10
    }

    this.http
      .get(
        'https://api.giphy.com/v1/gifs/search?api_key=Ju4IzB8dNE9YOjsVGZeYQX5pqEUxaTq3&q=dragon%20ball%20z&limit=10'
      )
      .subscribe((resp: any) => {
        console.log(resp.data);
      });
  }
}

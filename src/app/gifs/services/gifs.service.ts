import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey: string = 'Ju4IzB8dNE9YOjsVGZeYQX5pqEUxaTq3';
  private _browsingHistory: string[] = [];

  public dataResults: Gif[] = [];

  get browsingHistory() {
    return [...this._browsingHistory];
  }

  constructor(private http: HttpClient) {
    this._browsingHistory =
      JSON.parse(localStorage.getItem('browsingHistory')!) || [];

    //Otra forma de hacerlo:
    // if (localStorage.getItem('browsingHistory')) {
    //   this._browsingHistory = JSON.parse(
    //     localStorage.getItem('browsingHistory')!
    //   );
    // }
  }

  searchGifs(query: string) {
    query = query.trim().toLowerCase();
    if (!this._browsingHistory.includes(query)) {
      //validamos si el valor ya está introducido.
      this._browsingHistory.unshift(query); //Si no lo está, lo añado al array
      this._browsingHistory = this._browsingHistory.splice(0, 10); //Y hago el corte hasta 10
      localStorage.setItem(
        'browsingHistory',
        JSON.stringify(this._browsingHistory)
      );
    }

    this.http
      .get<SearchGifsResponse>(
        `https://api.giphy.com/v1/gifs/search?api_key=Ju4IzB8dNE9YOjsVGZeYQX5pqEUxaTq3&q=${query}&limit=10`
      )
      .subscribe((resp: any) => {
        console.log(resp.data);
        this.dataResults = resp.data;
      });
  }
}

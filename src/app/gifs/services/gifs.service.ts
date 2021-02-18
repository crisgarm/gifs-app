import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey: string = 'Ju4IzB8dNE9YOjsVGZeYQX5pqEUxaTq3';
  private apiUrl: string = 'https://api.giphy.com/v1/gifs';
  private _browsingHistory: string[] = [];

  public dataResults: Gif[] = [];

  get browsingHistory() {
    return [...this._browsingHistory];
  }

  constructor(private http: HttpClient) {
    this._browsingHistory =
      JSON.parse(localStorage.getItem('browsingHistory')!) || [];

    this.dataResults = JSON.parse(localStorage.getItem('dataResults')!) || [];

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

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    this.http
      .get<SearchGifsResponse>(`${this.apiUrl}/search`, { params })
      .subscribe((resp: any) => {
        this.dataResults = resp.data;
        localStorage.setItem('dataResults', JSON.stringify(this.dataResults));
      });
  }
}

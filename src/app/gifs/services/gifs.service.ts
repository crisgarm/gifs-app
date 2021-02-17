import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private _browsingHistory: string[] = [];

  get browsingHistory() {
    return [...this._browsingHistory];
  }

  searchGifs(query: string) {
    query = query.trim().toLowerCase();
    if (!this._browsingHistory.includes(query)) {
      //validamos si el valor ya está introducido.
      this._browsingHistory.unshift(query); //Si no lo está, lo añado al array
      this._browsingHistory = this._browsingHistory.splice(0, 10); //Y hago el corte hasta 10
    }

    console.log(this._browsingHistory);
  }
}

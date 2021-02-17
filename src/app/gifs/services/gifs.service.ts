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
    this._browsingHistory.unshift(query);
    console.log(this._browsingHistory);
  }
}

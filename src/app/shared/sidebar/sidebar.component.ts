import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  get browsingHistory() {
    return this.gifsService.browsingHistory;
  }

  constructor(private gifsService: GifsService) {}

  searchImages(query: string) {
    this.gifsService.searchGifs(query);
  }
}

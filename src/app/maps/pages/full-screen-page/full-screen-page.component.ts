import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { Map, MapStyle } from '@maptiler/sdk';

//import '@maptiler/sdk/dist/maptiler-sdk.css';

@Component({
  selector: 'maps-fullscreen-page',
  standalone: false,

  templateUrl: './full-screen-page.component.html',
  styleUrl: './full-screen-page.component.css'
})
export class FullScreenPageComponent implements OnInit, AfterViewInit, OnDestroy {

  public map!: Map;

  @ViewChild('map')
  private mapContainer?: ElementRef<HTMLElement>;

  ngOnInit(): void {
    // config.apiKey = 'x1T5te0N5W6HWDYYxktp';
  };

  ngAfterViewInit(): void {

    if ( !this.mapContainer ) throw 'El elemento HTML no fue encontrado';

    const initialState = { lng: -74.5, lat: 40, zoom: 9 };

    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: MapStyle.STREETS,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom
    });
  };

  ngOnDestroy() {
    // this.map.remove();
  };

}

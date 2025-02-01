import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { Map, MapStyle, LngLat } from '@maptiler/sdk';

import '@maptiler/sdk/dist/maptiler-sdk.css';

@Component({
  selector: 'maps-range-zoom-page',
  standalone: false,

  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css'
})
export class ZoomRangePageComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('map')
  private mapContainer?: ElementRef<HTMLElement>;

  public map!: Map;
  public zoom: number = 10;
  public currentLngLat: LngLat = new LngLat(-66.87742507681833, 10.497295069774296);

  ngOnInit(): void {
    // config.apiKey = 'x1T5te0N5W6HWDYYxktp';
  };

  ngAfterViewInit(): void {

    if ( !this.mapContainer ) throw 'El elemento HTML no fue encontrado';

    //const initialState = { lng: -74.5, lat: 40, zoom: 9 };

    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: MapStyle.STREETS,
      center: this.currentLngLat,
      zoom: this.zoom,
      navigationControl: false,
      geolocateControl: false
    });

    this.mapListeners();
  };

  ngOnDestroy() {
    this.map.remove();
  };

  mapListeners(): void {
    if ( !this.map ) throw 'Mapa no inicializado';

    this.map.on('zoom', (ev) => {
      this.zoom = this.map.getZoom();
    });

    this.map.on('zoomend', (ev) => {
      if( this.map.getZoom() < 18 ) return;
      this.map.zoomTo(18);
    });

    this.map.on('move', () => {
      this.currentLngLat = this.map.getCenter();
      // const { lng, lat } = this.currentLngLat;
    });

    // this.map.on('zoomstart', (ev) => {
    //   if( this.map.getZoom() > 0 ) return;
    //   this.map.zoomTo(1);
    // });

  };

  zoomIn(): void {
    this.map.zoomIn();
  };

  zoomOut(): void {
    this.map.zoomOut();
  };

  zoomChanged( value: string ): void {
    this.zoom = Number(value);
    this.map.zoomTo(this.zoom);

  };
}

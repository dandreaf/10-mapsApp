import { Component, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { Map, MapStyle, Marker } from '@maptiler/sdk';

import '@maptiler/sdk/dist/maptiler-sdk.css';

@Component({
  selector: 'map-mini-map',
  standalone: false,

  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MiniMapComponent implements AfterViewInit {

  public map!: Map;

  @Input()
  public lngLat?: [number, number];

  @ViewChild('map')
  public mapContainer?: ElementRef<HTMLElement>;



  ngAfterViewInit() {

    if ( !this.mapContainer?.nativeElement ) throw "Map not found.";
    if ( !this.lngLat ) throw "LngLat can't be null";

    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: MapStyle.STREETS,
      center: this.lngLat,
      zoom: 15,
      navigationControl: false,
      geolocateControl: false,
      interactive: false
    });


    new Marker({
      color: 'green'
    })
      .setLngLat( this.lngLat )
      .addTo( this.map );
  };

};

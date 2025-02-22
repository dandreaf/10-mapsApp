import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { Map, MapStyle, LngLat, Marker } from '@maptiler/sdk';

// import '@maptiler/sdk/dist/maptiler-sdk.css';

interface MarkerAndColor {
  color: string;
  marker: Marker;
  colorText: string;
};

interface PlainMarker {
  color: string;
  lngLat: number[];
  colorText: string;
}

@Component({
  selector: 'maps-markers-page',
  standalone: false,

  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css'
})
export class MarkersPageComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('map')
  private mapContainer?: ElementRef<HTMLElement>;

  public map!: Map;
  public markers: MarkerAndColor[] = [];

  public zoom: number = 13;
  public currentLngLat: LngLat = new LngLat(-66.87742507681833, 10.497295069774296);

  ngOnInit(): void {
    // config.apiKey = 'x1T5te0N5W6HWDYYxktp';
  };

  ngAfterViewInit(): void {

    if ( !this.mapContainer ) throw 'El elemento HTML no fue encontrado';

    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: MapStyle.STREETS,
      center: this.currentLngLat,
      zoom: this.zoom,
      navigationControl: false,
      geolocateControl: false
    });

    this.readFromLocalStorage();

    // const markerHtml = document.createElement('div');
    // markerHtml.innerHTML = 'fabricio';

    // const marker = new Marker({
    //   // color: 'red'
    //   element: markerHtml
    // })
    //   .setLngLat( this.currentLngLat )
    //   .addTo( this.map );
  };

  ngOnDestroy() {
    this.map.remove();
  };

  createMarker(): void {

    if( !this.map ) return;

    const lngLat = this.map.getCenter();
    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const contrastColor = (c: string)=>["#000","#fff"][~~([.299,.587,.114].reduce((r,v,i)=>parseInt(c.substr(i*2+1,2),16)*v+r,0)<128)];
    const colorText = contrastColor(color);

    this.addMarker( lngLat, color, colorText );

  };

  addMarker(lngLat: LngLat, color: string, colorText: string ): void {
    if( !this.map ) return;


    const marker = new Marker({
      color: color,
      draggable: true
    })
      .setLngLat( lngLat )
      .addTo( this.map );

    this.markers.push( { color, marker, colorText } );
    this.saveToLocalStorage();

    marker.on('dragend', () => {
      this.saveToLocalStorage();
    });
  };

  deleteMarker( index: number ): void {
    this.markers[index].marker.remove();
    this.markers.splice( index, 1 );
    this.saveToLocalStorage();
  };

  flyTo( marker: Marker ): void {
    if( !this.map ) return;

    this.map.flyTo({
      zoom: 14,
      center: marker.getLngLat()
    });
  };

  saveToLocalStorage(): void {
    const plainMarkers: PlainMarker[] = this.markers.map( ({ color, marker, colorText }) => {

      return {
        color,
        lngLat: marker.getLngLat().toArray(),
        colorText: colorText
      };
    });

    localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers));
  };

  readFromLocalStorage(): void {
    const plainMarkersString: string = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers: PlainMarker[] = JSON.parse(plainMarkersString);

    plainMarkers.forEach( ( {color, lngLat, colorText} )  => {
      const [lng, lat] = lngLat;
      const coords = new LngLat(lng, lat);

      this.addMarker(coords, color, colorText);
    });

  };

}

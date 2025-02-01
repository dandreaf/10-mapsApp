import { Component } from '@angular/core';

interface MenuItem {
  name: string;
  route: string;
}

@Component({
  selector: 'maps-side-menu',
  standalone: false,

  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {

  public menuIems: MenuItem[] = [
    { route: '/maps/fullscreen', name: 'FullScreen'},
    { route: '/maps/zoom-range', name: 'Zoom-Range'},
    { route: '/maps/markers', name: 'Markers'},
    { route: '/maps/properties', name: 'Houses'},
  ]

}

import { Component, OnInit  } from '@angular/core';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss']
})
export class GoogleMapsComponent implements OnInit {
  constructor() {}
    ngOnInit(): void {}
    display: any;
    center: google.maps.LatLngLiteral = {
        lat: 40.73487536535739,
        lng: -73.98929919020333
    };
    zoom = 14;
}

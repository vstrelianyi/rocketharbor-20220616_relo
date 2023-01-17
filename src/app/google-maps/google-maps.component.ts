// https://developers.google.com/maps/documentation/javascript/examples/distance-matrix

import { Component, ViewChild, ElementRef, AfterViewInit, OnInit  } from '@angular/core';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss']
})
export class GoogleMapsComponent implements AfterViewInit, OnInit {
  @ViewChild('map') mapElement: ElementRef;

  lat = 51.678418;
  lng = 7.809007;
  map: google.maps.Map;

  selectedRegion: number = 0;
  regions= [
    { id: 0, region: 'Chicago' },
    { id: 1, region: 'NY' },
    { id: 2, region: 'Washington' },
    { id: 3, region: 'Seattle ' },
  ];

  selectedNeighborhood: number = 0;
  neighborhoods= [
    { id: 0, neighborhood: 'Avondale' },
    { id: 1, neighborhood: 'Beverly' },
    { id: 2, neighborhood: 'Bridgeport' },
    { id: 3, neighborhood: 'Brighton Park' },
  ];

  destinationDistance: string | null = null;
  destinationDuration: string | null = null;

  ngOnInit(): void{
  }

  ngAfterViewInit(): void {
    this.map = new google.maps.Map( this.mapElement.nativeElement, {
      center: {
        lng: this.lng,
        lat: this.lat
      },
      zoom: 14,
      fullscreenControl: false,
      mapTypeControl: false,
      streetViewControl: false
    } as any);
  }

  callback = ( response: any, status: any ): void => {
    console.log(response, status)
    console.log(this)
    if( status === 'OK'){
      // console.log( response.rows[0].elements[0].distance.text, response.rows[0].elements[0].duration.text );
      this.destinationDistance = response.rows[0].elements[0].distance.text;
      this.destinationDuration = response.rows[0].elements[0].duration.text;
    }
  }

    // google destination request params
    apiKey="AIzaSyA0-a41lTXpAx99Yish46Xukhy-M4OFFC8";
    units="metric";

    origin= new google.maps.LatLng( 55.930385, -3.118425 );
    destination = new google.maps.LatLng( 50.087692, 14.421150 );

    service = new google.maps.DistanceMatrixService();

  async onClick(): Promise<void>{
    this.service.getDistanceMatrix(
      {
        origins: [ this.origin ],
        destinations: [ this.destination ],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false,
      }, this.callback
    );
  }


  // display: any;
  // center: google.maps.LatLngLiteral = {
  //     lat: 40.73487536535739,
  //     lng: -73.98929919020333
  // };
  // zoom = 14;
}

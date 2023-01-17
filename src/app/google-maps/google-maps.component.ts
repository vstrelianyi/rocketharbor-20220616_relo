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
    { id: 0, region: 'Chicago', lat: 55.930385, lng: -3.118425 },
    { id: 1, region: 'NY', lat: 4, lng: 12 },
    { id: 2, region: 'Washington', lat: 50.087692, lng: 14.421150 },
    { id: 3, region: 'Kyiv ', lat: 50.487033383161226, lng: 30.46568599818268 },
  ];

  selectedNeighborhood: number = 0;
  neighborhoods= [
    { id: 0, neighborhood: 'Avondale', lat: 50.087692, lng: 14.421150 },
    { id: 1, neighborhood: 'Beverly', lat: 55.930385, lng: -3.118425 },
    { id: 2, neighborhood: 'Bridgeport', lat: 55.930385, lng: -3.118425 },
    { id: 3, neighborhood: 'Brighton Park', lat: 55.930385, lng: -3.118425 },
    { id: 4, neighborhood: 'NY', lat: 40.80403886829473, lng: -73.62606451318769 },

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
    // console.log(response, status)
    if( status === 'OK'){
      if( response.rows[0].elements[0].status === 'OK'){ // check if path exists
        this.destinationDistance = response.rows[0].elements[0].distance.text;
        this.destinationDuration = response.rows[0].elements[0].duration.text;
      }
    }
  }

  service = new google.maps.DistanceMatrixService();
  async onClick(): Promise<void>{
    const origin= new google.maps.LatLng( this.regions[ this.selectedRegion ].lat, this.regions[ this.selectedRegion ].lng );
    const destination = new google.maps.LatLng( this.neighborhoods[ this.selectedNeighborhood ].lat, this.neighborhoods[ this.selectedNeighborhood ].lng );

    this.service.getDistanceMatrix(
      {
        origins: [ origin ],
        destinations: [ destination ],
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

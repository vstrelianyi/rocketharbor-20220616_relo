import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-smart-search-map',
  templateUrl: './smart-search-map.component.html',
  styleUrls: ['./smart-search-map.component.scss']
})
export class SmartSearchMapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  selectedRegion: number = 0;
  regions= [
    { id: 1, region: 'Chicago' },
    { id: 2, region: 'NY' },
    { id: 3, region: 'Washington' },
    { id: 4, region: 'Seattle ' },
  ];

  selectedNeighborhood: number = 0;
  neighborhoods= [
    { id: 1, neighborhood: 'Avondale' },
    { id: 2, neighborhood: 'Beverly' },
    { id: 3, neighborhood: 'Bridgeport' },
    { id: 4, neighborhood: 'Brighton Park' },
  ];

}

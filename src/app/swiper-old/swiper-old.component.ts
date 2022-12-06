import { Component, OnInit } from '@angular/core';

import SwiperCore from 'swiper/core';

@Component({
  selector: 'app-swiper-old',
  templateUrl: './swiper-old.component.html',
  styleUrls: ['./swiper-old.component.scss']
})
export class SwiperOldComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onSwiper(swiper:any) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }

}

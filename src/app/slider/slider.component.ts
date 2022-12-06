import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';

import { SwiperComponent } from "swiper/angular";
import SwiperCore, { Swiper, Virtual } from 'swiper';

SwiperCore.use([Virtual ]);

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SliderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // onSwiper([swiper]:any) {
  //   console.log(swiper);
  // }
  // onSlideChange() {
  //   console.log('slide change');
  // }
  @ViewChild( 'swiper', { static: false }) swiper?: SwiperComponent;
  slideNext(){
    this?.swiper?.swiperRef.slideNext(300);
  }
  slidePrev(){
    this?.swiper?.swiperRef.slidePrev(300);
  }

}

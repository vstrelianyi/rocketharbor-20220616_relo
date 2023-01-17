import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';

import SwiperCore from 'swiper';

@Component({
  selector: 'app-swiper-old',
  templateUrl: './swiper-old.component.html',
  styleUrls: ['./swiper-old.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SwiperOldComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public swiperConfig = {
    slidesPerView: 1,
    spaceBetween: 38,
    navigation: false,
    breakpoints:{
      992:{
        slidesPerView: 5,
      }
    }
  }

  onSwiper(swiper:any) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }

  @ViewChild( 'swiper', { static: false }) swiper?: SwiperOldComponent;

  // slideNext(){
  //   this?.swiper?.swiperRef.slideNext(300);
  // }
  // slidePrev(){
  //   this?.swiper?.swiperRef.slidePrev(300);
  // }

}

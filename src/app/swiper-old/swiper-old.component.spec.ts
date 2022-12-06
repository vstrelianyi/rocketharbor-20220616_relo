import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiperOldComponent } from './swiper-old.component';

describe('SwiperOldComponent', () => {
  let component: SwiperOldComponent;
  let fixture: ComponentFixture<SwiperOldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwiperOldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwiperOldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

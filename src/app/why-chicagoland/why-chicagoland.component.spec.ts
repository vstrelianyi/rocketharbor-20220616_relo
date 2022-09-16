import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyChicagolandComponent } from './why-chicagoland.component';

describe('WhyChicagolandComponent', () => {
  let component: WhyChicagolandComponent;
  let fixture: ComponentFixture<WhyChicagolandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhyChicagolandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhyChicagolandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

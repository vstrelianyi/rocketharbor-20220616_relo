import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyReloComponent } from './why-relo.component';

describe('WhyReloComponent', () => {
  let component: WhyReloComponent;
  let fixture: ComponentFixture<WhyReloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhyReloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhyReloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

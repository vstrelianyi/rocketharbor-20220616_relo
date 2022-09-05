import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartSearchMapComponent } from './smart-search-map.component';

describe('SmartSearchMapComponent', () => {
  let component: SmartSearchMapComponent;
  let fixture: ComponentFixture<SmartSearchMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmartSearchMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmartSearchMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

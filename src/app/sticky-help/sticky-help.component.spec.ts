import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickyHelpComponent } from './sticky-help.component';

describe('StickyHelpComponent', () => {
  let component: StickyHelpComponent;
  let fixture: ComponentFixture<StickyHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StickyHelpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StickyHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

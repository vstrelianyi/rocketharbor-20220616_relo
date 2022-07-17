import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IllinoisLawComponent } from './illinois-law.component';

describe('IllinoisLawComponent', () => {
  let component: IllinoisLawComponent;
  let fixture: ComponentFixture<IllinoisLawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IllinoisLawComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IllinoisLawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

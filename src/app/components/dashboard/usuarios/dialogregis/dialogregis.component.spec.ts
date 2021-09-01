import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogregisComponent } from './dialogregis.component';

describe('DialogregisComponent', () => {
  let component: DialogregisComponent;
  let fixture: ComponentFixture<DialogregisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogregisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogregisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogVComponent } from './dialog-v.component';

describe('DialogVComponent', () => {
  let component: DialogVComponent;
  let fixture: ComponentFixture<DialogVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogVComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudpersonaComponent } from './crudpersona.component';

describe('CrudpersonaComponent', () => {
  let component: CrudpersonaComponent;
  let fixture: ComponentFixture<CrudpersonaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudpersonaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudpersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

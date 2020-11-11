import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapnhatthongtincdComponent } from './capnhatthongtincd.component';

describe('CapnhatthongtincdComponent', () => {
  let component: CapnhatthongtincdComponent;
  let fixture: ComponentFixture<CapnhatthongtincdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapnhatthongtincdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapnhatthongtincdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

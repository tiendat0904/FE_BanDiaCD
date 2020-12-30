import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapnhatchitiethoadonnhapComponent } from './capnhatchitiethoadonnhap.component';

describe('CapnhatchitiethoadonnhapComponent', () => {
  let component: CapnhatchitiethoadonnhapComponent;
  let fixture: ComponentFixture<CapnhatchitiethoadonnhapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapnhatchitiethoadonnhapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapnhatchitiethoadonnhapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

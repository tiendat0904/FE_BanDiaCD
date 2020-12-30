import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachchitiethoadonnhapComponent } from './danhsachchitiethoadonnhap.component';

describe('DanhsachchitiethoadonnhapComponent', () => {
  let component: DanhsachchitiethoadonnhapComponent;
  let fixture: ComponentFixture<DanhsachchitiethoadonnhapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanhsachchitiethoadonnhapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachchitiethoadonnhapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

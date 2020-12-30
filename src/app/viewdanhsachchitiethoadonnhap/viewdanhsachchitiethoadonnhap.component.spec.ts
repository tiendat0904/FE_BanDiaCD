import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewdanhsachchitiethoadonnhapComponent } from './viewdanhsachchitiethoadonnhap.component';

describe('ViewdanhsachchitiethoadonnhapComponent', () => {
  let component: ViewdanhsachchitiethoadonnhapComponent;
  let fixture: ComponentFixture<ViewdanhsachchitiethoadonnhapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewdanhsachchitiethoadonnhapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewdanhsachchitiethoadonnhapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

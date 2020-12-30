import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachhoadonnhapComponent } from './danhsachhoadonnhap.component';

describe('DanhsachhoadonnhapComponent', () => {
  let component: DanhsachhoadonnhapComponent;
  let fixture: ComponentFixture<DanhsachhoadonnhapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanhsachhoadonnhapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachhoadonnhapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

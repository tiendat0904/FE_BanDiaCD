import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachthongtincdComponent } from './danhsachthongtincd.component';

describe('DanhsachthongtincdComponent', () => {
  let component: DanhsachthongtincdComponent;
  let fixture: ComponentFixture<DanhsachthongtincdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanhsachthongtincdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachthongtincdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

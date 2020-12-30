import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatedanhsachchitiethoadonnhapComponent } from './updatedanhsachchitiethoadonnhap.component';

describe('UpdatedanhsachchitiethoadonnhapComponent', () => {
  let component: UpdatedanhsachchitiethoadonnhapComponent;
  let fixture: ComponentFixture<UpdatedanhsachchitiethoadonnhapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatedanhsachchitiethoadonnhapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatedanhsachchitiethoadonnhapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

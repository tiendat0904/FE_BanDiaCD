import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { taikhoanModel } from 'src/model/taikhoan-model';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TaikhoanService } from 'src/service/taikhoan.service';

@Component({
  selector: 'app-capnhattaikhoan',
  templateUrl: './capnhattaikhoan.component.html',
  styleUrls: ['./capnhattaikhoan.component.css']
})
export class CapnhattaikhoanComponent implements OnInit {

  @ViewChild('content') public childModal!: ModalDirective;
  @Input() danhsachtaikhoan: Array<taikhoanModel>;
  @Output() eventEmit: EventEmitter<any> = new EventEmitter<any>();
  checkButton = false;
  closeResult: String;
  modalReference!: any;
  formGroup: FormGroup;
  isAdd = false;
  isEdit = false;
  isInfo = false;
  submitted = false;
  isLoading=false;
  title = '';
  type: any;
  model: taikhoanModel;
  arrCheck = [];
  update_ma_tai_khoan: any;
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private taikhoanService: TaikhoanService,) {
    }

  ngOnInit(): void {
    this.submitted = false;

    
  }

  updateFormType(type: any) {
    switch (type) {
      case 'add':
        this.isInfo = false;
        this.isEdit = false;
        this.isAdd = true;
        this.title = `Thêm mới thông tin tài khoản`;
        this.update_ma_tai_khoan= this.arrCheck.length+1;
        console.log(this.arrCheck);
        break;
      case 'show':
        this.isInfo = true;
        this.isEdit = false;
        this.isAdd = false;
        this.title = `Xem chi tiết thông tin tài khoản`;
        this.update_ma_tai_khoan = this.model.ma_tai_khoan;
        break;
      case 'edit':
        this.isInfo = false;
        this.isEdit = true;
        this.isAdd = false;
        this.title = `Chỉnh sửa thông tin tài khoản`;
        this.update_ma_tai_khoan = this.model.ma_tai_khoan;
        break;
      default:
        this.isInfo = false;
        this.isEdit = false;
        this.isAdd = true;
        break;
    }
  }

  view(model: taikhoanModel, type = null): void {
    this.arrCheck = this.danhsachtaikhoan;
    this.open(this.childModal);
    this.type = type;
    this.model = model;
    this.submitted = false;
    this.updateFormType(type);
   
    if (model.ma_tai_khoan === null || model.ma_tai_khoan === undefined) {
      this.formGroup = this.fb.group({
        ma_tai_khoan: [ null, [Validators.required]],
        ten_dang_nhap: [ null, [Validators.required]],
        mat_khau: [ null, [Validators.required]],
        ho_ten: [ null, [Validators.required]],
        dia_chi: [ null, [Validators.required]],
        so_dien_thoai: [ null, [Validators.required]],
        hinh_anh : [ null, [Validators.required]],
        
      });
    } else {
      this.formGroup = this.fb.group({
        ma_tai_khoan: [{value: this.model.ma_tai_khoan, disabled: this.isInfo}, [Validators.required]],
        ten_dang_nhap:  [{value: this.model.ten_dang_nhap, disabled: this.isInfo}, [Validators.required]],
        mat_khau:  [{value: this.model.mat_khau, disabled: this.isInfo}, [Validators.required]],
        ho_ten:  [{value: this.model.ho_ten, disabled: this.isInfo}, [Validators.required]],
        dia_chi:  [{value: this.model.dia_chi, disabled: this.isInfo}, [Validators.required]],
        so_dien_thoai:  [{value: this.model.so_dien_thoai, disabled: this.isInfo}, [Validators.required]],
        hinh_anh : [{value: this.model.hinh_anh, disabled: this.isInfo}, [Validators.required]],
      });


    }
  }


  open(content: any) {
    this.modalReference = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      centered: true,
      size: 'md',
    });
    this.modalReference.result.then(
      (result: any) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason: any) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  save() {
    let check = false;
    let taikhoan: taikhoanModel;
    this.submitted = true;
    // if (this.formGroup.invalid) {
    //   this.toastr.error('Kiểm tra thông tin các trường đã nhập');
    //   return;
    // }
    if (this.isEdit) {
      taikhoan = {
        ma_tai_khoan: this.formGroup.get('ma_tai_khoan')?.value,
        ten_dang_nhap: this.formGroup.get('ten_dang_nhap')?.value,
        mat_khau: this.formGroup.get('mat_khau')?.value,
        ho_ten: this.formGroup.get('ho_ten')?.value,
        dia_chi: this.formGroup.get('dia_chi')?.value,
        so_dien_thoai: this.formGroup.get('so_dien_thoai')?.value,
        hinh_anh : this.formGroup.get('hinh_anh')?.value,
      };
    } else {
      taikhoan = {
        ma_tai_khoan: this.formGroup.get('ma_tai_khoan')?.value,
        ten_dang_nhap: this.formGroup.get('ten_dang_nhap')?.value,
        mat_khau: this.formGroup.get('mat_khau')?.value,
        ho_ten: this.formGroup.get('ho_ten')?.value,
        dia_chi: this.formGroup.get('dia_chi')?.value,
        so_dien_thoai: this.formGroup.get('so_dien_thoai')?.value,
        hinh_anh : this.formGroup.get('hinh_anh')?.value,
      };
    }
    if (this.isAdd) {
      for (let i = 0; i < this.arrCheck.length; i++) {
        if (this.arrCheck[i].ma_tai_khoan === taikhoan.ma_tai_khoan) {
          check = true;
          break;
        }
      }
      if (check === true) {
        this.toastr.error('Mã tài khoản đã tồn tại');
        return;
      }
      console.log(taikhoan);
      this.taikhoanService.create(taikhoan).subscribe(res => {
          this.closeModalReloadData();
          this.toastr.success('Thêm mới thành công');
          this.modalReference.dismiss();
        },
        err => {
          this.toastr.error(err);
          this.toastr.error('Có lỗi xảy ra!');
        });
    }
    if (this.isEdit) {
      this.taikhoanService.update(taikhoan.ma_tai_khoan, taikhoan).subscribe(res => {
          this.closeModalReloadData();
          this.toastr.success('Sửa thành công');
          this.modalReference.dismiss();
        },
        err => {
          this.toastr.error(err);
          this.toastr.error('Có lỗi xảy ra!');
        });
    }
  }

  public closeModalReloadData(): void {
    this.submitted = false;
    this.eventEmit.emit('success');
  }

}

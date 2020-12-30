import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import firebase from 'firebase';
import { thongtincdModel } from 'src/model/thongtincd-model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ThongTinCDService } from 'src/service/thongtincd.service';
import { daodienModel } from 'src/model/daodien-model';
import { LoaiCDService } from 'src/service/loaicd.service';
import { TemBanQuyenService } from 'src/service/tembanquyen.service';
import { DaoDienService } from 'src/service/daodien.service';
import { tembanquyenModel } from 'src/model/tembanquyen-model';
import { loaicdModel } from 'src/model/loaicd-model';

import { Subscription } from 'rxjs';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { avatarDefault } from 'src/environments/environment';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-capnhatthongtincd',
  templateUrl: './capnhatthongtincd.component.html',
  styleUrls: ['./capnhatthongtincd.component.css']
})
export class CapnhatthongtincdComponent implements OnInit {

  @ViewChild('content') public childModal!: ModalDirective;
  @Input() danhsachthongtincd: Array<thongtincdModel>;
  @Output() eventEmit: EventEmitter<any> = new EventEmitter<any>();
  danhsachloaicd: Array<loaicdModel> = [];
  danhsachdaodien: Array<daodienModel> = [];
  danhsachthongtincd1 : Array<thongtincdModel> = [];
  danhsachtembanquyen: Array<tembanquyenModel> = [];
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
  model: thongtincdModel;
  arrCheck = [];
  update_ma_CD: any;
  update_ma_cD1:any;

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  urlPictureDefault = avatarDefault;
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private thongtincdService: ThongTinCDService,
    private loaicdService: LoaiCDService,
    private tembanquyenService: TemBanQuyenService,
    private daodienService: DaoDienService,
    private store: AngularFireStorage) {
    }

  ngOnInit(): void {
    this.submitted = false;
    this.fetchDanhsachdaodien();
    this.fetchDanhsachloaicd();
    this.fetchDanhsachtembanquyen();
    this.thongtincdService.getAll().subscribe(data => {
      this.danhsachthongtincd1 = data.data;
      this.update_ma_cD1 = this.danhsachthongtincd1[this.danhsachthongtincd1.length-1].ma_CD;
      this.update_ma_cD1 = this.update_ma_cD1 +1;
      console.log(this.danhsachthongtincd1);

    },
      err => {
        this.isLoading = false;
      })
    
  }

  fetchDanhsachloaicd(){
    this.isLoading =  true;
    this.loaicdService.getAll().subscribe(data => {
      this.danhsachloaicd = data.data;
    },
    err => {
        this.isLoading = false;
      })
  }

  fetchDanhsachdaodien(){
    this.isLoading =  true;
    this.daodienService.getAll().subscribe(data => {
      this.danhsachdaodien= data.data;
    },
    err => {
        this.isLoading = false;
      })
  }

  fetchDanhsachtembanquyen(){
    this.isLoading =  true;
    this.tembanquyenService.getAll().subscribe(data => {
      this.danhsachtembanquyen= data.data;
    },
    err => {
        this.isLoading = false;
      })
  }


  updateFormType(type: any) {
    switch (type) {
      case 'add':
        this.isInfo = false;
        this.isEdit = false;
        this.isAdd = true;  
        this.title = `Thêm mới thông tin CD`;
        this.update_ma_CD= this.update_ma_cD1;
        break;
      case 'show':
        this.isInfo = true;
        this.isEdit = false;
        this.isAdd = false;
        this.title = `Xem chi tiết thông tin CD`;
        this.update_ma_CD = this.model.ma_CD;
        break;
      case 'edit':
        this.isInfo = false;
        this.isEdit = true;
        this.isAdd = false;
        this.title = `Chỉnh sửa thông tin CD`;
        this.update_ma_CD = this.model.ma_CD;
        break;
      default:
        this.isInfo = false;
        this.isEdit = false;
        this.isAdd = true;
        break;
    }
  }

  view(model: thongtincdModel, type = null): void {
   
    
    
    this.arrCheck = this.danhsachthongtincd1;
    this.open(this.childModal);
    this.type = type;
    this.model = model;
    this.submitted = false;
    this.updateFormType(type);
   
    if (model.ma_CD === null || model.ma_CD === undefined) {
      this.formGroup = this.fb.group({
        ma_CD: [ null, [Validators.required]],
        ten_CD: [ null, [Validators.required]],
        ma_loai_CD: [ null, [Validators.required]],
        ma_tem_ban_quyen: [ null, [Validators.required]],
        ma_dao_dien: [ null, [Validators.required]],
        mo_ta: [ null],
        gia_ban:[ null],
        so_luong: [ null],
        khu_vuc : [ null],
        
      });
      this.urlPictureDefault = avatarDefault;
    } else {
      this.formGroup = this.fb.group({
        ma_CD: [{value: this.model.ma_CD, disabled: this.isInfo}, [Validators.required]],
        ten_CD:  [{value: this.model.ten_CD, disabled: this.isInfo}, [Validators.required]],
        ma_loai_CD:  [{value: this.model.ma_loai_CD, disabled: this.isInfo}, [Validators.required]],
        ma_tem_ban_quyen:  [{value: this.model.ma_tem_ban_quyen, disabled: this.isInfo}, [Validators.required]],
        ma_dao_dien:  [{value: this.model.ma_dao_dien, disabled: this.isInfo}, [Validators.required]],
        mo_ta:  [{value: this.model.mo_ta, disabled: this.isInfo}],
        gia_ban :  [{value: this.model.gia_ban, disabled: this.isInfo}],
        so_luong :  [{value: this.model.so_luong, disabled: this.isInfo}],
        khu_vuc : [{value: this.model.khu_vuc, disabled: this.isInfo}],
        hinh_anh : [{value: this.model.hinh_anh, disabled: this.isInfo}],
        
      });
      if(this.model.hinh_anh===""){
        this.urlPictureDefault = avatarDefault;
      }
      else{
        this.urlPictureDefault=this.model.hinh_anh;

      }

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
    let thongtincd: thongtincdModel;
    this.submitted = true;
    if (this.formGroup.invalid) {
      this.toastr.error('Kiểm tra thông tin các trường đã nhập');
      return;
    }
    if (this.isEdit) {
      thongtincd = {
        ma_CD: this.formGroup.get('ma_CD')?.value,
        ten_CD: this.formGroup.get('ten_CD')?.value,
        ma_loai_CD: this.formGroup.get('ma_loai_CD')?.value,
        ma_tem_ban_quyen: this.formGroup.get('ma_tem_ban_quyen')?.value,
        ma_dao_dien: this.formGroup.get('ma_dao_dien')?.value,
        mo_ta: this.formGroup.get('mo_ta')?.value,
        khu_vuc : this.formGroup.get('khu_vuc')?.value,
        hinh_anh : this.urlPictureDefault,
      };
    } else {
      thongtincd = {
        ma_CD: this.formGroup.get('ma_CD')?.value,
        ten_CD: this.formGroup.get('ten_CD')?.value,
        ma_loai_CD: this.formGroup.get('ma_loai_CD')?.value,
        ma_tem_ban_quyen: this.formGroup.get('ma_tem_ban_quyen')?.value,
        ma_dao_dien: this.formGroup.get('ma_dao_dien')?.value,
        mo_ta: this.formGroup.get('mo_ta')?.value,
        khu_vuc : this.formGroup.get('khu_vuc')?.value,
        hinh_anh : this.urlPictureDefault,
      };
    }
    if (this.isAdd) {
      for (let i = 0; i < this.arrCheck.length; i++) {
        if (this.arrCheck[i].ma_CD === thongtincd.ma_CD) {
          check = true;
          break;
        }
      }
      if (check === true) {
        this.toastr.error('Mã CD đã tồn tại');
        return;
      }
      this.thongtincdService.create(thongtincd).subscribe(res => {
        this.closeModalReloadData();
        this.toastr.success(res.success);
        this.thongtincdService.getAll().subscribe(data => {
          this.danhsachthongtincd1 = data.data;
          this.update_ma_cD1 = this.danhsachthongtincd1[this.danhsachthongtincd1.length-1].ma_CD;
          this.update_ma_cD1 = this.update_ma_cD1 +1;
    
        },
          err => {
            this.isLoading = false;
          })
        console.log(this.update_ma_cD1);
        this.modalReference.dismiss();
      },
      err => {
        this.toastr.error(err.error.error);
      }
      );
    }
    
    if (this.isEdit) {
      this.thongtincdService.update(thongtincd.ma_CD, thongtincd).subscribe(res => {
        this.closeModalReloadData();
        this.toastr.success(res.success);
        this.modalReference.dismiss();
      },
      err => {
        this.toastr.error(err.error.error);
      }
      );
    }
  }

  public closeModalReloadData(): void {
    this.submitted = false;
    this.eventEmit.emit('success');
  }

  uploadImage(event) {
    // tslint:disable-next-line:prefer-const
    let file = event.target.files[0];
    // tslint:disable-next-line:prefer-const
    let path = `${file.name}`;
    if (file.type.split('/')[0] !== 'image') {
      return alert('Erreur, ce fichier n\'est pas une image');
    } else {
      // tslint:disable-next-line:prefer-const
      let ref = this.store.ref(path);
      // tslint:disable-next-line:prefer-const
      let task = this.store.upload(path, file);
      this.uploadPercent = task.percentageChanges();
      task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = ref.getDownloadURL();
          this.downloadURL.subscribe(url => {
          this.urlPictureDefault=url;
          });
        }
        )
      ).subscribe();
    }
  }

}

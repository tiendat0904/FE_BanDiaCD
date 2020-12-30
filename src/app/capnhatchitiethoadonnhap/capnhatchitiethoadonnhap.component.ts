import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { chitiethoadonnhapModel } from 'src/model/chitiethoadonnhap-model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ChiTietHoaDonNhapService } from 'src/service/chitiethoadonnhap.service';
import { thongtincdModel } from 'src/model/thongtincd-model';
import { ThongTinCDService } from 'src/service/thongtincd.service';
import { HoaDonNhapService } from 'src/service/hoadonnhap-service';
import { hoadonnhapModel } from 'src/model/hoadonnhap-model';

@Component({
  selector: 'app-capnhatchitiethoadonnhap',
  templateUrl: './capnhatchitiethoadonnhap.component.html',
  styleUrls: ['./capnhatchitiethoadonnhap.component.css']
})
export class CapnhatchitiethoadonnhapComponent implements OnInit {

  @ViewChild('content') public childModal!: ModalDirective;
  @Input() danhsachchitiethoadonnhap: Array<chitiethoadonnhapModel>;
  @Input() mess_hoa_don_nhap : hoadonnhapModel;
  @Input() mess_hoa_don_nhap1 : any;
  @Input() isAdd1 : Boolean;
  @Output() eventEmit: EventEmitter<any> = new EventEmitter<any>();
  listFilterResult: chitiethoadonnhapModel[] = [];
  listFilterResult1: Array<chitiethoadonnhapModel> = [];
  danhsachthongtincd: Array<thongtincdModel> = [];
  danhsachchitiethoadonnhap1: Array<chitiethoadonnhapModel> = [];
  danhsachhoadonnhap: Array<hoadonnhapModel> = [];
  checkButton = false;
  closeResult: String;
  modalReference!: any;
  formGroup: FormGroup;
  isAdd = false;
  image: string = null;
  isEdit = false;
  avatarUrl;
  isEditimage=false;
  isInfo = false;
  submitted = false;
  isLoading=false;
  title = '';
  type: any;
  arrCheck = [];
  update_ma_HDN:any;
  model: chitiethoadonnhapModel;
  dem: number = 0;
  checkNumber : number = 0;
 
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private chitiethoadonnhapService: ChiTietHoaDonNhapService,
    private thongtincdService: ThongTinCDService,
    private hoadonnhapService: HoaDonNhapService,
    ) {
    }

  ngOnInit(): void {
    this.submitted = false;
    this.fetchDanhsachchitiethoadonnhap();
    this.fetchDanhsachthongtincd();
    this.fetchDanhsachhoadonnhap();
  }

  fetchDanhsachchitiethoadonnhap(){
    this.danhsachchitiethoadonnhap=[];
    this.chitiethoadonnhapService.getAll().subscribe(data => {
      this.danhsachchitiethoadonnhap = data.data; 
    },
    err => {
        this.isLoading = false;
      })
  }

  fetchDanhsachhoadonnhap(){
    this.danhsachhoadonnhap=[];
    this.hoadonnhapService.getAll().subscribe(data => {
      this.danhsachhoadonnhap = data.data;
      this.update_ma_HDN = this.danhsachhoadonnhap[this.danhsachhoadonnhap.length-1].ma_HDN;
      this.update_ma_HDN = this.update_ma_HDN+1;
    },
    err => {
        this.isLoading = false;
      })
  }

  fetchDanhsachthongtincd(){
    this.danhsachthongtincd=[];
    this.thongtincdService.getAll().subscribe(data => {
      this.danhsachthongtincd = data.data;
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
        this.title = `Thêm mới thông tin chi tiết hóa đơn nhập`;
        //  this.update_ma_HDN = this.arrCheck.length+1;
        break;
      case 'show':
        this.isInfo = true;
        this.isEdit = false;
        this.isAdd = false;
        this.title = `Xem chi tiết thông tin chi tiết hóa đơn nhập`;
        //  this.update_ma_HDN = this.model.id;
        break;
      case 'edit':
        this.isInfo = false;
        this.isEdit = true;
        this.isAdd = false;
        this.title = `Chỉnh sửa thông tin chi tiết hóa đơn nhập`;
        //  this.update_ma_HDN = this.model.id;
        break;
      default:
        this.isInfo = false;
        this.isEdit = false;
        this.isAdd = true;
        break;
    }
  }

  view(model: chitiethoadonnhapModel, type = null): void {
    this.arrCheck = this.danhsachchitiethoadonnhap;
    this.open(this.childModal);
    this.type = type;
    this.model = model;
    this.submitted = false;
    this.updateFormType(type);
   
    if (model.id === null || model.id === undefined) {
      if(this.mess_hoa_don_nhap1===undefined){
        this.formGroup = this.fb.group({
          ma_HDN: [ this.update_ma_HDN],
          ma_CD: [ null, [Validators.required]],
          so_luong: [ null, [Validators.required]],
          gia_nhap : [ null , [Validators.required]],
  
          
        });
      }else{
        this.formGroup = this.fb.group({
          ma_HDN: [ this.mess_hoa_don_nhap1],
          ma_CD: [ null, [Validators.required]],
          so_luong: [ null, [Validators.required]],
          gia_nhap : [ null , [Validators.required]],
  
          
        });
      }
      
    } else {
      this.formGroup = this.fb.group({
        ma_HDN: [{value: this.mess_hoa_don_nhap1, disabled: this.isInfo}],
        ma_CD:[{value: this.model.ma_CD, disabled: this.isInfo}, [Validators.required]],
        so_luong:[{value: this.model.so_luong, disabled: this.isInfo}, [Validators.required]],
        gia_nhap : [{value: this.model.gia_nhap, disabled: this.isInfo}, [Validators.required]],
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
    let chitiethoadonnhap: chitiethoadonnhapModel;
    this.submitted = true;
    if (this.formGroup.invalid) {
      this.toastr.error('Kiểm tra thông tin các trường đã nhập');
      return;
    }
    
    if(this.checkNumber === 0 && this.isAdd1===true){
      this.hoadonnhapService.create(this.mess_hoa_don_nhap).subscribe(res => {
      },
      err => {
        this.toastr.error(err.error.error);
      }
      );
    }
    
    
    if (this.isEdit) {
      chitiethoadonnhap = {
        id: this.model.id,
        ma_HDN: this.formGroup.get('ma_HDN')?.value,
        ma_CD: this.formGroup.get('ma_CD')?.value,
        so_luong: this.formGroup.get('so_luong')?.value,
        gia_nhap : this.formGroup.get('gia_nhap')?.value,
      };
     
    } else {
      chitiethoadonnhap = {
        ma_HDN: this.formGroup.get('ma_HDN')?.value,
        ma_CD: this.formGroup.get('ma_CD')?.value,
        so_luong: this.formGroup.get('so_luong')?.value,
        gia_nhap : this.formGroup.get('gia_nhap')?.value,
      };
    }
    if (this.isAdd) {
      for (let i = 0; i < this.arrCheck.length; i++) {
        if (this.arrCheck[i].id === chitiethoadonnhap.id) {
          check = true;
          break;
        }
      }
      if (check === true) {
        this.toastr.error('Mã nhà cung cấp đã tồn tại');
        return;
      }
      this.chitiethoadonnhapService.create(chitiethoadonnhap).subscribe(res => {
        this.closeModalReloadData();
        
        this.listFilterResult=[];
        this.chitiethoadonnhapService.getAll().subscribe(data => {
          this.danhsachchitiethoadonnhap = data.data;
          for(let item of this.danhsachchitiethoadonnhap){
            if(item.ma_HDN===this.mess_hoa_don_nhap1 || item.ma_HDN=== this.update_ma_HDN){
                this.listFilterResult.push(item);
                this.checkNumber = this.listFilterResult.length;
            }
          }
        },)

        this.toastr.success(res.success);
        this.modalReference.dismiss();
       
      },
      err => {
        this.toastr.error(err.error.error);
      }
      );
    }
    if (this.isEdit) {
      this.chitiethoadonnhapService.update(chitiethoadonnhap.id, chitiethoadonnhap).subscribe(res => {
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

}

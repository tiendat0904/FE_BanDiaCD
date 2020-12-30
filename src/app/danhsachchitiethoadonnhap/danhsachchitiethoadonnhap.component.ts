import { Component, OnInit, ViewChild } from '@angular/core';
import { CapnhatchitiethoadonnhapComponent } from '../capnhatchitiethoadonnhap/capnhatchitiethoadonnhap.component';
import { chitiethoadonnhapModel } from 'src/model/chitiethoadonnhap-model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ChiTietHoaDonNhapService } from 'src/service/chitiethoadonnhap.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { taikhoanModel } from 'src/model/taikhoan-model';
import { TaikhoanService } from 'src/service/taikhoan.service';
import { nhaphathanhModel } from 'src/model/nhaphathanh-model';
import { NhaPhatHanhService } from 'src/service/nhaphathanh.service';
import { ActivatedRoute, Router } from '@angular/router';
import { hoadonnhapModel } from 'src/model/hoadonnhap-model';
import { HoaDonNhapService } from 'src/service/hoadonnhap-service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-danhsachchitiethoadonnhap',
  templateUrl: './danhsachchitiethoadonnhap.component.html',
  styleUrls: ['./danhsachchitiethoadonnhap.component.css']
})
export class DanhsachchitiethoadonnhapComponent implements OnInit {

  @ViewChild(CapnhatchitiethoadonnhapComponent) view!: CapnhatchitiethoadonnhapComponent;
  danhsachchitiethoadonnhap: Array<chitiethoadonnhapModel> = [];
  danhsachnhaphathanh: Array<nhaphathanhModel> = [];
  danhsachhoadonnhap: Array<hoadonnhapModel> = [];
  danhsachnhanvien: Array<taikhoanModel> = [];
  modalReference: any;
  isDelete = true;
  closeResult: string;
  isLoading = false;
  isSelected = true;
  update_tong_tien = 0.00;
  submitted = false;
  formGroup: FormGroup;
  searchedKeyword: string;
  update_ma_HDN: any;
  isAdd : Boolean;
  listFilterResult: chitiethoadonnhapModel[] = [];
  listFilterResult1: Array<chitiethoadonnhapModel> = [];
  page = 1;
  pageSize = 5;
  filterResultTemplist: chitiethoadonnhapModel[] = [];
  isCheckhdn = true;
  isCheckhdn1 = false;
  isButtonSave = false;
  ma_HDN: any;
  update_ma_hdn1 :any;
  update_ma_nhan_vien= null;
  update_ma_nha_phat_hanh= null;
  hoadonnhap: hoadonnhapModel;
  constructor(
    private modalService: NgbModal,
    private chitiethoadonnhapService: ChiTietHoaDonNhapService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router,
    private taikhoanService: TaikhoanService,
    private nhaphathanhService: NhaPhatHanhService,
    private actRoute: ActivatedRoute,
    private hoadonnhapService: HoaDonNhapService,
    private datePipe: DatePipe
    ) {
      this.hoadonnhapService.getAll().subscribe(data => {
        this.danhsachhoadonnhap = data.data;
        this.update_ma_HDN = this.danhsachhoadonnhap[this.danhsachhoadonnhap.length-1].ma_HDN;
        this.update_ma_HDN = this.update_ma_HDN+1;
      },)
      
     
      
      this.formGroup = this.fb.group({
        ma_HDN: [this.update_ma_HDN],
        ma_nhan_vien: [ null,[Validators.required]],
        ma_nha_phat_hanh:[ null,[Validators.required]],
        ngay_nhap: [this.datePipe.transform(Date.now(),"yyyy/MM/dd")],
        tong_tien:[this.update_tong_tien ],
      });
    }

  
  ngOnInit(): void {
    this.isAdd = true;
    this.fetchDanhsachchitiethoadonnhap();
    this.submitted = false;
    this.fetchDanhsachnhanvien();
    this.fetchDanhsachnhaphathanh();
    this.hoadonnhapService.detail(this.update_ma_HDN).subscribe(data => {
      this.danhsachhoadonnhap = data.data;
      if(data.data === undefined){
      }else{
        if(data.data.ma_HDN === undefined || data.data.ma_HDN === null){
          
        }
        else{
          
          this.update_ma_nha_phat_hanh = data.data.ma_nha_phat_hanh;
          this.update_ma_nhan_vien = data.data.ma_nhan_vien;
          this.update_tong_tien = data.data.tong_tien;
        }
      }
      
      
    },)
    
  }

  save() {
    let check = false;
    
    this.submitted = true;
    if (this.formGroup.invalid) {
      this.toastr.error('Kiểm tra thông tin các trường đã nhập');
      return;
    }
    this.hoadonnhap = {
      ma_nhan_vien: this.formGroup.get('ma_nhan_vien')?.value,
      ma_nha_phat_hanh: this.formGroup.get('ma_nha_phat_hanh')?.value,
     
    };
    this.isButtonSave = true;
    this.isCheckhdn = false;
    this.isCheckhdn1 = true;

    
  } 

  fetchDanhsachhoadonnhap(){
    this.danhsachhoadonnhap=[];
    this.isLoading =  true;
    this.hoadonnhapService.getAll().subscribe(data => {
      this.danhsachhoadonnhap = data.data;
      this.update_ma_HDN = this.danhsachhoadonnhap.length+1;
    },
    err => {
        this.isLoading = false;
      })
  }

  fetchDanhsachnhanvien(){
    this.danhsachnhanvien=[];
    this.isLoading =  true;
    this.taikhoanService.getAll().subscribe(data => {
      this.danhsachnhanvien = data.data;
    },
    err => {
        this.isLoading = false;
      })
  }

  fetchDanhsachnhaphathanh(){
    this.danhsachnhaphathanh=[];
    this.isLoading =  true;
    this.nhaphathanhService.getAll().subscribe(data => {
      this.danhsachnhaphathanh = data.data;
    },
    err => {
        this.isLoading = false;
      })
  }
  

  fetchDanhsachchitiethoadonnhap() { 
    this.listFilterResult=[];
    this.listFilterResult1 =[];
    this.isLoading = true;
    this.chitiethoadonnhapService.getAll().subscribe(data => {
      this.danhsachchitiethoadonnhap = data.data;
      for(let item of this.danhsachchitiethoadonnhap){
        if(item.ma_HDN===this.update_ma_HDN){
            this.listFilterResult.push(item);
            this.listFilterResult1.push(item);
        }
      }
      this.listFilterResult.forEach((x) => (x.checked = false));
      this.filterResultTemplist = this.listFilterResult;
    },
      err => {
        this.isLoading = false;
      })
  }

  public filterByKeyword() {
    var filterResult = [];
    if (this.searchedKeyword.length == 0) {
      this.listFilterResult = this.filterResultTemplist;
    } else {
      this.listFilterResult = this.filterResultTemplist;
      var keyword = this.searchedKeyword.toLowerCase();
      this.listFilterResult.forEach(item => {
        var dc = item.ma_CD.toString();
        var hot_line = item.ten_CD.toLowerCase();
        var ten = item.gia_nhap.toString();
        if (hot_line.includes(keyword) || ten.includes(keyword) || dc.includes(keyword)) {
          filterResult.push(item);
        }
      });
      this.listFilterResult = filterResult;
    }
  }

  
  open(content: any) {
    this.modalReference = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
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

  checkAllCheckBox(ev) {
    this.listFilterResult.forEach((x) => (x.checked = ev.target.checked));
    this.changeModel();
  }

  isAllCheckBoxChecked() {
    return this.listFilterResult.every((p) => p.checked);
  }

  changeModel() {
    const selectedHometowns = this.listFilterResult
      .filter((chitiethoadonnhap) => chitiethoadonnhap.checked)
      .map((p) => p.ma_CD);
    if (selectedHometowns.length > 0) {
      this.isDelete = false;

    } else {
      this.isDelete = true;
    }
  }

  getNavigation(link, id){
    if(this.listFilterResult.length===0){
      
      this.router.navigate([link]);
    }else{
      
      this.router.navigate([link]);
    }
    
  }

  xoachitiethoadonnhap(item: any = null) {
    let selectedchitiethoadonnhap= [];
    if (item !== null && item !== undefined && item !== '') {
      selectedchitiethoadonnhap.push(item);
      this.delete(selectedchitiethoadonnhap);
      return;
    }
    selectedchitiethoadonnhap = this.listFilterResult
      .filter((chitiethoadonnhap) => chitiethoadonnhap.checked)
      .map((p) => p.ma_CD);
    if (selectedchitiethoadonnhap.length === 0) {
      this.toastr.error('Chọn ít nhất một bản ghi để xóa.');
      return;
    }
    this.delete(selectedchitiethoadonnhap);
  }

  initModal(model: any,type = null): void {
    this.view.view(model, type);
  }

  changeStatus(event: any) {
    this.isLoading = true;
    let list = [];
    // tslint:disable-next-line: radix
    switch (parseInt(event)) {
      case -1:
        this.listFilterResult = [...this.listFilterResult1];
        this.isLoading = false;
        break;
      case 1:
        list = [...this.listFilterResult1];
        this.listFilterResult = list.filter(item => item.isActive === 1);
        this.isLoading = false;
        break;
      case 0:
        list = [...this.listFilterResult1];
        this.listFilterResult = list.filter(item => item.isActive === 0);
        this.isLoading = false;
        break;
      default:
        break;
    }
  }

  public delete(listid: any) {
    const modelDelete = {
      listId: listid
    };
    for (var i = 0; i < this.listFilterResult.length; i++) {
      if (this.listFilterResult[i].checked == true) {
        this.listFilterResult[i].checked = false;
      }
    }
    this.searchedKeyword = null;
    this.filterResultTemplist = this.listFilterResult;
    for (var i = 0; i < this.listFilterResult.length; i++) {
      if (this.listFilterResult[i].checked == true) {
        this.listFilterResult[i].checked = false;
      }
    }
    this.searchedKeyword = null;
    this.filterResultTemplist = this.listFilterResult;

    this.chitiethoadonnhapService.delete(modelDelete).subscribe(
      (result) => {
        // status: 200
        this.ngOnInit();
        this.changeModel();
        if (result.error) {
          this.toastr.error(result.error);
        } else {
          this.toastr.success(result.success);
        }
        this.modalReference.dismiss();
      },
    );
  }

}

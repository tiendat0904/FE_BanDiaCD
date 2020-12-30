import { Component, OnInit } from '@angular/core';
import { hoadonnhapModel } from 'src/model/hoadonnhap-model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HoaDonNhapService } from 'src/service/hoadonnhap-service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-danhsachhoadonnhap',
  templateUrl: './danhsachhoadonnhap.component.html',
  styleUrls: ['./danhsachhoadonnhap.component.css']
})
export class DanhsachhoadonnhapComponent implements OnInit {

  danhsachhoadonnhap: Array<hoadonnhapModel> = [];
  modalReference: any;
  isDelete = true;
  closeResult: string;
  isLoading = false;
  isSelected = true;
  searchedKeyword: string;
  listFilterResult: hoadonnhapModel[] = [];
  page = 1;
  pageSize = 5;
  filterResultTemplist: hoadonnhapModel[] = [];
  constructor(
    private modalService: NgbModal,
    private hoadonnhapService: HoaDonNhapService,
    private toastr: ToastrService,
    private router: Router
    ) {
    }

  
  ngOnInit(): void {
    this.fetchDanhsachhoadonnhap();
  }


  

  fetchDanhsachhoadonnhap() {
    this.isLoading = true;
    this.hoadonnhapService.getAll().subscribe(data => {
      this.danhsachhoadonnhap = data.data;
      this.listFilterResult = data.data;
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
        var dc = item.ma_HDN.toString();
        var hot_line = item.ten_nhan_vien.toLowerCase();
        var ten = item.ten_nha_phat_hanh.toLowerCase();
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
      .filter((hoadonnhap) => hoadonnhap.checked)
      .map((p) => p.ma_HDN);
    if (selectedHometowns.length > 0) {
      this.isDelete = false;

    } else {
      this.isDelete = true;
    }
  }

  xoahoadonnhap(item: any = null) {
    let selectedhoadonnhap= [];
    if (item !== null && item !== undefined && item !== '') {
      selectedhoadonnhap.push(item);
      this.delete(selectedhoadonnhap);
      return;
    }
    selectedhoadonnhap = this.listFilterResult
      .filter((hoadonnhap) => hoadonnhap.checked)
      .map((p) => p.ma_HDN);
    if (selectedhoadonnhap.length === 0) {
      this.toastr.error('Chọn ít nhất một bản ghi để xóa.');
      return;
    }
    this.delete(selectedhoadonnhap);
  }

  // initModal(model: any,type = null): void {
  //   this.view.view(model, type);
  // }

  changeStatus(event: any) {
    this.isLoading = true;
    let list = [];
    // tslint:disable-next-line: radix
    switch (parseInt(event)) {
      case -1:
        this.listFilterResult = [...this.danhsachhoadonnhap];
        this.isLoading = false;
        break;
      case 1:
        list = [...this.danhsachhoadonnhap];
        this.listFilterResult = list.filter(item => item.isActive === 1);
        this.isLoading = false;
        break;
      case 0:
        list = [...this.danhsachhoadonnhap];
        this.listFilterResult = list.filter(item => item.isActive === 0);
        this.isLoading = false;
        break;
      default:
        break;
    }
  }

  getNavigation(link, id){
    if(id === ''){
        this.router.navigate([link]);
    } else {
        this.router.navigate([link + '/' + id]);
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

    this.hoadonnhapService.delete(modelDelete).subscribe(
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

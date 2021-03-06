import { Component, OnInit, ViewChild } from '@angular/core';
import { CapnhatthongtincdComponent } from '../capnhatthongtincd/capnhatthongtincd.component';
import { thongtincdModel } from 'src/model/thongtincd-model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ThongTinCDService } from 'src/service/thongtincd.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-danhsachthongtincd',
  templateUrl: './danhsachthongtincd.component.html',
  styleUrls: ['./danhsachthongtincd.component.css']
})
export class DanhsachthongtincdComponent implements OnInit {

  @ViewChild(CapnhatthongtincdComponent) view!: CapnhatthongtincdComponent;
  danhsachthongtincd: Array<thongtincdModel> = [];
  modalReference: any;
  isDelete = true;
  closeResult: string;
  isLoading = false;
  isDelete1 = false;
  isSelected = true;
  searchedKeyword: string;
  listFilterResult: thongtincdModel[] = [];
  page = 1;
  pageSize = 5;
  filterResultTemplist: thongtincdModel[] = [];
  constructor(
    private modalService: NgbModal,
    private thongtincdService: ThongTinCDService,
    private toastr: ToastrService
    ) {
    }

  
  ngOnInit(): void {
    this.fetchDanhsachthongtincd();
  }


  

  fetchDanhsachthongtincd() {
    this.isLoading = true;
    this.thongtincdService.getAll().subscribe(data => {
      this.danhsachthongtincd = data.data;
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
        var dc = item.ma_CD.toString();
        var hot_line = item.ten_CD.toLowerCase();
        var ten = item.so_luong.toString();
        var ten1= item.gia_ban.toString();
        if (hot_line.includes(keyword) || ten.includes(keyword) || dc.includes(keyword) || ten1.includes(keyword)) {
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
      .filter((thongtincd) => thongtincd.checked)
      .map((p) => p.ma_CD);
    if (selectedHometowns.length > 0) {
      this.isDelete = false;

    } else {
      this.isDelete = true;
    }
  }

  xoathongtincd(item: any = null) {
    let selectedthongtincd= [];
    if (item !== null && item !== undefined && item !== '') {
      selectedthongtincd.push(item);
      this.delete(selectedthongtincd);
      return;
    }
    selectedthongtincd = this.listFilterResult
      .filter((thongtincd) => thongtincd.checked)
      .map((p) => p.ma_CD);
    if (selectedthongtincd.length === 0) {
      this.toastr.error('Chọn ít nhất một bản ghi để xóa.');
      return;
    }
    this.delete(selectedthongtincd);
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
        this.listFilterResult = [...this.danhsachthongtincd];
        this.isLoading = false;
        break;
      case 1:
        list = [...this.danhsachthongtincd];
        this.listFilterResult = list.filter(item => item.isActive === 1);
        this.isLoading = false;
        break;
      case 0:
        list = [...this.danhsachthongtincd];
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
    console.log(modelDelete);
    this.thongtincdService.delete(modelDelete).subscribe(
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

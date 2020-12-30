import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DanhsachtaikhoanComponent } from './danhsachtaikhoan/danhsachtaikhoan.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ModalModule } from 'ngb-modal';
import { ToastrModule } from 'ngx-toastr'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CapnhattaikhoanComponent } from './capnhattaikhoan/capnhattaikhoan.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PipesModule } from 'src/pipe/pipes/pipes.module';
import { DanhsachthongtincdComponent } from './danhsachthongtincd/danhsachthongtincd.component';
import { CapnhatthongtincdComponent } from './capnhatthongtincd/capnhatthongtincd.component';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common'
import {AngularFireModule} from "@angular/fire";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import { DanhsachhoadonnhapComponent } from './danhsachhoadonnhap/danhsachhoadonnhap.component';
import { DanhsachchitiethoadonnhapComponent } from './danhsachchitiethoadonnhap/danhsachchitiethoadonnhap.component';
import { CapnhatchitiethoadonnhapComponent } from './capnhatchitiethoadonnhap/capnhatchitiethoadonnhap.component';
import { ViewdanhsachchitiethoadonnhapComponent } from './viewdanhsachchitiethoadonnhap/viewdanhsachchitiethoadonnhap.component';
import { UpdatedanhsachchitiethoadonnhapComponent } from './updatedanhsachchitiethoadonnhap/updatedanhsachchitiethoadonnhap.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DanhsachtaikhoanComponent,
    CapnhattaikhoanComponent,
    DanhsachthongtincdComponent,
    CapnhatthongtincdComponent,
    DanhsachhoadonnhapComponent,
    DanhsachchitiethoadonnhapComponent,
    CapnhatchitiethoadonnhapComponent,
    ViewdanhsachchitiethoadonnhapComponent,
    UpdatedanhsachchitiethoadonnhapComponent, 
  ],
  imports: [
    BrowserModule,
    ModalModule,
    PipesModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    Ng2SearchPipeModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2500,
      positionClass: 'toast-top-center',
      closeButton: true,
      maxOpened: 5,
      newestOnTop: true
    }),
    RouterModule.forRoot([
      {
        path: 'danhsachtaikhoan',
        component:DanhsachtaikhoanComponent
      },
      {
        path: 'danhsachtaikhoan',
        component:DanhsachtaikhoanComponent
      },
      {
        path: 'danhsachhoadonnhap',
        component:DanhsachhoadonnhapComponent
      },
      {
        path: 'danhsachhoadonnhap/create',
        component:DanhsachchitiethoadonnhapComponent
      },

      {
        path: 'danhsachhoadonnhap/view/:id',
        component:ViewdanhsachchitiethoadonnhapComponent
      },
      {
        path: 'danhsachhoadonnhap/update/:id',
        component:UpdatedanhsachchitiethoadonnhapComponent
      },
      {
        path: 'danhsachthongtincd',
        component:DanhsachthongtincdComponent
      },
      {
        path: '',
        component:HomeComponent
      },
    ])
    
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

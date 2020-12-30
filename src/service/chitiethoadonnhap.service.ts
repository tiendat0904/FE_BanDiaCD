import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { chitiethoadonnhapModel } from 'src/model/chitiethoadonnhap-model';

@Injectable({
  providedIn: 'root'
})
export class ChiTietHoaDonNhapService {

  constructor(private httpClient: HttpClient) { }

  create(model: chitiethoadonnhapModel): Observable<any>{
    return this.httpClient.post(environment.BASE_API_URL + environment.BASE_API +'coupon-details', model);
  }

  getAll(): Observable<any>{
    return this.httpClient.get(environment.BASE_API_URL+ environment.BASE_API+'coupon-details');
  }

  update(id: any, model: chitiethoadonnhapModel): Observable<any>{
    return this.httpClient.put(environment.BASE_API_URL + environment.BASE_API +'coupon-details/' + id, model);
  }

  detail(id: any): Observable<any>{
    return this.httpClient.get(environment.BASE_API_URL + environment.BASE_API +'coupon-details/'+id);
  }

  delete(modelDelete: any): Observable<any>{
    return this.httpClient.post(environment.BASE_API_URL + environment.BASE_API +'coupon-details/delete', modelDelete);
  }
}

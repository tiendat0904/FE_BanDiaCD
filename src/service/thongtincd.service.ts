import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { thongtincdModel } from 'src/model/thongtincd-model';

@Injectable({
  providedIn: 'root'
})
export class ThongTinCDService {

  constructor(private httpClient: HttpClient) { }

  create(model: thongtincdModel): Observable<any>{
    return this.httpClient.post(environment.BASE_API_URL + environment.BASE_API +'information-cd', model);
  }

  getAll(): Observable<any>{
    return this.httpClient.get(environment.BASE_API_URL+ environment.BASE_API+'information-cd');
  }

  update(id: any, model: thongtincdModel): Observable<any>{
    return this.httpClient.put(environment.BASE_API_URL + environment.BASE_API +'information-cd/' + id, model);
  }

  detail(id: any): Observable<any>{
    return this.httpClient.get(environment.BASE_API_URL + environment.BASE_API +'information-cd/'+id);
  }

  delete(modelDelete: any): Observable<any>{
    return this.httpClient.post(environment.BASE_API_URL + environment.BASE_API +'information-cd/delete', modelDelete);
  }
}

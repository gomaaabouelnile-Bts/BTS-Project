import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITransactionStatus } from 'src/app/Interface/Codes/itransaction-status';
import { GlobalAPIURLService } from '../global-apiurl.service';

@Injectable({
  providedIn: 'root'
})
export class STransactionStatusService {
  SITransactionStatus: ITransactionStatus;
  SITransactionStatusList: ITransactionStatus[];
  constructor(private http: HttpClient, private GlobalAPI: GlobalAPIURLService) { }

  localUrl = this.GlobalAPI.URLAPI + 'TransactionStatus/';
  GetAlldata() {
    return this.http.get<ITransactionStatus[]>(this.localUrl + 'Getall');
  }
  Getdata() {
    return this.http.get(this.localUrl + 'Getall');
  }

  FindByG(index) {
    return this.http.get<ITransactionStatus[]>(this.localUrl + 'FindByG/' + index);
  }
  putData() {
    return this.http.put(this.localUrl + 'Update', this.SITransactionStatus);
  }

  postData() {
    return this.http.post(this.localUrl + 'Save', this.SITransactionStatus);
  }
  Delete(index) {
    return this.http.delete(this.localUrl + 'Delete/' + index);
  }
  GetOne(index) {
    return this.http.get(this.localUrl + 'Find/' + index);
  }
}
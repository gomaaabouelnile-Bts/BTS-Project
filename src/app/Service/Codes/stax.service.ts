import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITax } from 'src/app/Interface/Codes/itax';
import { GlobalAPIURLService } from '../global-apiurl.service';

@Injectable({
  providedIn: 'root'
})
export class STaxService {
  SITax: ITax;
  SITaxList: ITax[];
  constructor(private http: HttpClient, private GlobalAPI: GlobalAPIURLService) { }

  localUrl = this.GlobalAPI.URLAPI + 'Tax/';
  GetAlldata() {
    return this.http.get<ITax[]>(this.localUrl + 'Getall');
  }
  Getdata() {
    return this.http.get(this.localUrl + 'Getall');
  }

  FindByG(index) {
    return this.http.get<ITax[]>(this.localUrl + 'FindByG/' + index);
  }
  putData() {
    return this.http.put(this.localUrl + 'Update', this.SITax);
  }

  postData() {
    return this.http.post(this.localUrl + 'Save', this.SITax);
  }
  Delete(index) {
    return this.http.delete(this.localUrl + 'Delete/' + index);
  }
  GetOne(index) {
    return this.http.get(this.localUrl + 'Find/' + index);
  }
}
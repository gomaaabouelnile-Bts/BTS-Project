import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITaxSubTypes } from 'src/app/Interface/Codes/i-tax-sub-types';
import { GlobalAPIURLService } from '../global-apiurl.service';

@Injectable({
  providedIn: 'root'
})
export class STaxSubTypesService {
  SITaxSubTypes: ITaxSubTypes;
  SITaxSubTypesList: ITaxSubTypes[];
  constructor(private http: HttpClient, private GlobalAPI: GlobalAPIURLService) { }

  localUrl = this.GlobalAPI.URLAPI + 'TaxSubtypes/';
  GetAlldata() {
    return this.http.get<ITaxSubTypes[]>(this.localUrl + 'Getall');
  }
  Getdata() {
    return this.http.get(this.localUrl + 'Getall');
  }

  FindByG(index) {
    return this.http.get<ITaxSubTypes[]>(this.localUrl + 'FindByG/' + index);
  }
  putData() {
    return this.http.put(this.localUrl + 'Update', this.SITaxSubTypes);
  }

  postData() {
    return this.http.post(this.localUrl + 'Save', this.SITaxSubTypes);
  }
  Delete(index) {
    return this.http.delete(this.localUrl + 'Delete/' + index);
  }
  GetOne(index) {
    return this.http.get(this.localUrl + 'Find/' + index);
  }
}
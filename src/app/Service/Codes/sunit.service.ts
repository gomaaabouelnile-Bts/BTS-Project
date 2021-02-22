import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iuints } from 'src/app/Interface/Codes/iuints';
import { GlobalAPIURLService } from '../global-apiurl.service';

@Injectable({
  providedIn: 'root'
})
export class SunitService {
  SIuints: Iuints;
  SIuintsList: Iuints[];
  constructor(private http: HttpClient, private GlobalAPI: GlobalAPIURLService) { }

  localUrl = this.GlobalAPI.URLAPI + 'Units/';
  GetAlldata() {
    return this.http.get<Iuints[]>(this.localUrl + 'Getall');
  }
  Getdata() {
    return this.http.get(this.localUrl + 'Getall');
  }

  FindByG(index) {
    return this.http.get<Iuints[]>(this.localUrl + 'FindByG/' + index);
  }
  putData() {
    return this.http.put(this.localUrl + 'Update', this.SIuints);
  }

  postData() {
    return this.http.post(this.localUrl + 'Save', this.SIuints);
  }
  Delete(index) {
    return this.http.delete(this.localUrl + 'Delete/' + index);
  }
  GetOne(index) {
    return this.http.get(this.localUrl + 'Find/' + index);
  }
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iitems } from 'src/app/Interface/Codes/iitems';
import { GlobalAPIURLService } from '../global-apiurl.service';

@Injectable({
  providedIn: 'root'
})
export class SItemsService {
  SIitems: Iitems;
  SIitemsList: Iitems[];
  constructor(private http: HttpClient, private GlobalAPI: GlobalAPIURLService) { }

  localUrl = this.GlobalAPI.URLAPI + 'Items/';
  GetAlldata() {
    return this.http.get<Iitems[]>(this.localUrl + 'Getall');
  }
  Getdata() {
    return this.http.get(this.localUrl + 'Getall');
  }

  FindByG(index) {
    return this.http.get<Iitems[]>(this.localUrl + 'FindByG/' + index);
  }
  putData() {
    return this.http.put(this.localUrl + 'Update', this.SIitems);
  }

  postData() {
    return this.http.post(this.localUrl + 'Save', this.SIitems);
  }
  Delete(index) {
    return this.http.delete(this.localUrl + 'Delete/' + index);
  }
  GetOne(index) {
    return this.http.get(this.localUrl + 'Find/' + index);
  }
}

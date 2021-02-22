import { Injectable } from '@angular/core';
import { GlobalAPIURLService } from '../global-apiurl.service';
import { HttpClient } from '@angular/common/http';
import { IAdministrator } from 'src/app/Interface/Security/iadministrator';
import { LoginInterface } from 'src/app/Interface/Views/LoginInterface';

@Injectable({
  providedIn: 'root'
})
export class AdministratorService {

  IAdministrator: IAdministrator;
  IAdministratorList: IAdministrator[];
  ILogin: LoginInterface;
  constructor(private http: HttpClient, private GlobalAPI: GlobalAPIURLService) { }

  localUrl = this.GlobalAPI.URLAPI + "Administrator/";

  Getall() {
    return this.http.get<IAdministrator[]>(this.localUrl + 'Getall');
  }

  GetResetUsers() {
    return this.http.get<IAdministrator[]>(this.localUrl + 'GetResetUsers');
  }

  Exits() {
    return this.http.post(this.localUrl + 'Exits', this.IAdministrator);
  }

  Register() {
    return this.http.post<IAdministrator>(this.localUrl + 'Register', this.IAdministrator);
  }

  login() {
    return this.http.post<IAdministrator>(this.localUrl + 'login', this.ILogin);
  }

  Find(ID: any) {
    return this.http.get<IAdministrator>(this.localUrl + 'Find/' + ID);
  }

  FindByUserID(UserID: any) {
    return this.http.get<IAdministrator>(this.localUrl + 'FindByUserID/' + UserID);
  }

  FindByMail(Mail: any) {
    return this.http.get<IAdministrator>(this.localUrl + 'FindByMail/' + Mail);
  }

  Delete(ID: any) {
    return this.http.delete(this.localUrl + 'Delete/' + ID);
  }

  Update() {
    return this.http.put(this.localUrl + 'Update', this.IAdministrator);
  }
}

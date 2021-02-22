import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Iuser } from 'src/app/Interface/Security/user-Interface';
import { GlobalAPIURLService } from '../global-apiurl.service';
import { IuserLogon } from 'src/app/Interface/Security/IuserLogon';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  [x: string]: any;
  // localUrl = 'http://151.106.34.109:7040/api/Auth/';
  public  Seruser: Iuser;
  public loguser: IuserLogon;
  constructor(private http: HttpClient, private GlobalAPI: GlobalAPIURLService) { }

    localUrl = this.GlobalAPI.URLAPI + "Auth/";
  Login(name, password)
  {
    return this.http.get<Iuser>(this.localUrl + 'login' + '/' + name + '/' + password);
  }
  postdata()
  {
    return this.http.post(this.localUrl + 'register', this.Seruser);
  }

  postdatasecure()
  {
    return this.http.post(this.localUrl + 'loginuserSecure', this.loguser ,{
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })});
 
  }
  putdata()
  {
    return this.http.put(this.localUrl + 'put', this.Seruser);
  }

  GetOne(id,val)
  {
    return this.http.get<Iuser>(this.localUrl + 'getOne/'+id+'/'+val);
  }

  GetLogin(id)
  {
    return this.http.get<Iuser>(this.localUrl + 'GetLogin/'+id);
  }

  GetAlldata()
  {
    return this.http.get(this.localUrl + 'get');
  }

  GetAllAvailable()
  {
    return this.http.get(this.localUrl + 'getAvailable');
  }
  GetAvialableUsersnew(index)
  {
    
    return this.http.get(this.localUrl + 'GetAvialableUsersnew/'+index);
  }
  Delete(index)
  {
    return this.http.delete(this.localUrl + 'Delete/' + index);
  }

  ResetPassword(username)
  {
    return this.http.get(this.localUrl + 'Reset/' + username);
  }
 /*  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.storageService.retrieve(localStorage.getItem('jwt'))}`,
        'Content-Type': 'application/json'
      }
    });
    return next.handle(request).pipe(
      catchError(
        (err, caught) => {
          if (err.status === 401){
            this.handleAuthError();
            return of(err);
          }
          throw err;
        }
      )
      );
    }
    private handleAuthError() {
      this.storageService.delete(localStorage.getItem('jwt'));
      this.router.navigateByUrl('LogIn');
    } */
}

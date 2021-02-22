import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IApi } from '../Interface/Views/IApi';


@Injectable({
  providedIn: 'root'
})
export class GlobalAPIURLService {
private httpClient: HttpClient;
  // public URLAPI = ''; 
  constructor(public http: HttpClient) {
    this.httpClient = http;
 
  } 
 
  public httpOptions2 = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Basic ' + btoa('besttop.systems@besttopsystems.com:Bts11111')
    })
  };
  //public URLAPI = 'http://localhost:62960/api/';

//public URLAPI = 'http://FAT1:9090/api/'; 
public URLAPI = 'http://cail92t9z33:9090/api/'; 
/*  public URLAPI =this.getJSON().subscribe(data => {
  this.URLAPI=data;


  
});  */

 //public URLAPI = 'http://localhost:62960/api/';

/*  getFileData() {
  return this.http.get('/assets/Api.json')
    .pipe(
      switchMap((response: any) => this.http.get(response.pathToFile, {
        responseType: 'text'
        
      }))
    );
}
public getJSON(): Observable<any> {
  return this.http.get<IApi>("./assets/Api.json");
} */
  public httpOptions = {
    headers: new HttpHeaders(
        {
          Authorization: `Bearer ` + localStorage.getItem('jwt'),
        }
    )
};






}

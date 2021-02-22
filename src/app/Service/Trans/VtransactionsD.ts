
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItransactionsD } from 'src/app/Interface/Trans/ITransactionsD';


import { GlobalAPIURLService } from '../global-apiurl.service';
@Injectable({
    providedIn: 'root'
  })
export class TransactionsDService {
    // localUrl = 'http://151.106.34.109:7040/api/Groups/';
   StransactionsD: ItransactionsD;
   StransactionsDList: ItransactionsD[];
   constructor(private http: HttpClient, private GlobalAPI: GlobalAPIURLService) { }

    localUrl = this.GlobalAPI.URLAPI + 'transactionsD/';
   GetAlldata()
   {
     return this.http.get<ItransactionsD[]>(this.localUrl + 'Getall', this.GlobalAPI.httpOptions);
   }
   GetallByS(index)
   {
 console.log(this.localUrl + 'GetallByS/' + index, this.GlobalAPI.httpOptions);
     return this.http.get(this.localUrl + 'GetallByS/' + index, this.GlobalAPI.httpOptions);
   }
   putData()
   {
     return this.http.put(this.localUrl + 'put', this.StransactionsD, this.GlobalAPI.httpOptions);
   }

   postData()
   {
     return this.http.post(this.localUrl + 'post', this.StransactionsD, this.GlobalAPI.httpOptions);
   }
   Delete(index)
   {
     return this.http.delete(this.localUrl + 'Delete/' + index, this.GlobalAPI.httpOptions);
   }




 }

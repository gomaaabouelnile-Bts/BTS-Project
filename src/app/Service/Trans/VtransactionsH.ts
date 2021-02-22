
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Itrans } from 'src/app/Interface/Trans/Itrans';
import { ItransactionsH } from 'src/app/Interface/Trans/ItransactionsH';
import { IValidationobj } from 'src/app/Interface/Trans/IValidationobj';

import { GlobalAPIURLService } from '../global-apiurl.service';
@Injectable({
    providedIn: 'root'
  })
export class TransactionsHService {
    // localUrl = 'http://151.106.34.109:7040/api/Groups/';
   StransactionsH: ItransactionsH;
   StransactionsHList: ItransactionsH[];
   SItransList: Itrans[];
   constructor(private http: HttpClient, private GlobalAPI: GlobalAPIURLService) { }

    localUrl = this.GlobalAPI.URLAPI + 'transactionsH/';
    localUrl2 = this.GlobalAPI.URLAPI + 'GetTransaction/';
    localUrl3 = this.GlobalAPI.URLAPI + 'documents/';
   GetAlldata()
   {
     return this.http.get<Itrans[]>(this.localUrl + 'Getall', this.GlobalAPI.httpOptions);
   }
   GetTransaction()
   {
     return this.http.get<ItransactionsH[]>(this.localUrl2 + 'GetTransaction', this.GlobalAPI.httpOptions);
   }
   Validation(index)
   {
     return this.http.post<IValidationobj[]>(this.localUrl3 + 'Validation', index,
     this.GlobalAPI.httpOptions);
   }
   SubmittoETA(index)
   {
     return this.http.post<Itrans[]>(this.localUrl3 + 'SubmittoETA', index,
     this.GlobalAPI.httpOptions);
   }
   UpdateInvoiceStatus()
   {
     return this.http.get<Itrans[]>(this.localUrl + 'UpdateInvoiceStatus', 
     this.GlobalAPI.httpOptions);
   }
   GetallByS(index)
   {

     return this.http.get(this.localUrl + 'GetallByS/' + index, this.GlobalAPI.httpOptions);
   }

   LastExtractDate()
   {

     return this.http.get<Date>(this.localUrl + 'LastExtractDate', this.GlobalAPI.httpOptions);
   }
   putData()
   {
     return this.http.put(this.localUrl + 'put', this.StransactionsH, this.GlobalAPI.httpOptions);
   }

   postData()
   {
     return this.http.post(this.localUrl + 'post', this.StransactionsH, this.GlobalAPI.httpOptions);
   }
   Delete(index)
   {
     return this.http.delete(this.localUrl + 'Delete/' + index, this.GlobalAPI.httpOptions);
   }
   Getall2Async()
   {
     console.log(
     this.GlobalAPI.httpOptions2);
     return this.http.get('https://fa-epbd-test-saasfaprod1.fa.ocs.oraclecloud.com//fscmRestApi/resources/11.13.18.05/receivablesInvoices',
      this.GlobalAPI.httpOptions2);
   }



 }

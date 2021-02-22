
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Icountry } from 'src/app/Interface/Codes/Icountry';
import { ICurrencies } from 'src/app/Interface/Codes/ICurrencies';

import { GlobalAPIURLService } from '../global-apiurl.service';
@Injectable({
    providedIn: 'root'
  })
export class Currencyservice {

   SICurrencies: ICurrencies;
   SICurrencieslist: ICurrencies[];
   constructor(private http: HttpClient, private GlobalAPI: GlobalAPIURLService) { }

    // tslint:disable-next-line:quotemark
    localUrl = this.GlobalAPI.URLAPI + "Currencies/";
   GetAlldata()
   {
     return this.http.get<ICurrencies[]>(this.localUrl + 'Getall');
   }
   Getdata()
   {
     return this.http.get(this.localUrl + 'Getall');
   }
   putData()
   {
     return this.http.put(this.localUrl + 'Update', this.SICurrencies);
   }

   postData()
   {
     return this.http.post(this.localUrl + 'Save', this.SICurrencies);
   }
   Delete(index)
   {
     return this.http.delete(this.localUrl + 'Delete/' + index);
   }
   GetOne(index){
     return this.http.get(this.localUrl + 'Find/' + index);
   }
 }

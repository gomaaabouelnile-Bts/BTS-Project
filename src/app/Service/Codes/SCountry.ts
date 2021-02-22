
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Icountry } from 'src/app/Interface/Codes/Icountry';

import { GlobalAPIURLService } from '../global-apiurl.service';
@Injectable({
    providedIn: 'root'
  })
export class Countryservice {

   SICountry: Icountry;
   SICountrylist: Icountry[];
   constructor(private http: HttpClient, private GlobalAPI: GlobalAPIURLService) { }

    // tslint:disable-next-line:quotemark
    localUrl = this.GlobalAPI.URLAPI + "CountryCodes/";
   GetAlldata()
   {
     return this.http.get<Icountry[]>(this.localUrl + 'Getall');
   }
   Getdata()
   {
     return this.http.get(this.localUrl + 'Getall');
   }
   putData()
   {
     return this.http.put(this.localUrl + 'Update', this.SICountry);
   }

   postData()
   {
     return this.http.post(this.localUrl + 'Save', this.SICountry);
   }
   Delete(index)
   {
     return this.http.delete(this.localUrl + 'Delete/' + index);
   }
   GetOne(index){
     return this.http.get(this.localUrl + 'Find/' + index);
   }
 }

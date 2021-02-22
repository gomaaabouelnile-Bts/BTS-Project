
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICurrencyMapping } from 'src/app/Interface/Codes/ICurrencyMapping';
import { GlobalAPIURLService } from '../global-apiurl.service';
@Injectable({
    providedIn: 'root'
  })
export class CurrencyMappingservice {

   SICurrencyMapping: ICurrencyMapping;
   SICurrencyMappinglist: ICurrencyMapping[];
   constructor(private http: HttpClient, private GlobalAPI: GlobalAPIURLService) { }

    // tslint:disable-next-line:quotemark
    localUrl = this.GlobalAPI.URLAPI + "CurrencyMapping/";
   GetAlldata()
   {
     return this.http.get<ICurrencyMapping[]>(this.localUrl + 'Getall');
   }
   Getdata()
   {
     return this.http.get(this.localUrl + 'Getall');
   }
   putData()
   {
     return this.http.put(this.localUrl + 'Update', this.SICurrencyMapping);
   }

   postData()
   {
     return this.http.post(this.localUrl + 'Save', this.SICurrencyMapping);
   }
   Delete(index)
   {
     return this.http.delete(this.localUrl + 'Delete/' + index);
   }
   GetOne(index){
     return this.http.get(this.localUrl + 'Find/' + index);
   }
 }

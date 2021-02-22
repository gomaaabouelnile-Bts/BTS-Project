
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IitemMapping } from 'src/app/Interface/Codes/IitemMapping';
import { GlobalAPIURLService } from '../global-apiurl.service';
@Injectable({
    providedIn: 'root'
  })
export class ItemMappingservice {

   SIitemMapping: IitemMapping;
   SIitemMappinglist: IitemMapping[];
   constructor(private http: HttpClient, private GlobalAPI: GlobalAPIURLService) { }

    // tslint:disable-next-line:quotemark
    localUrl = this.GlobalAPI.URLAPI + "ItemMappings/";
   GetAlldata()
   {
     return this.http.get<IitemMapping[]>(this.localUrl + 'Getall');
   }
   Getdata()
   {
     return this.http.get(this.localUrl + 'Getall');
   }
   putData()
   {
     return this.http.put(this.localUrl + 'Update', this.SIitemMapping);
   }

   postData()
   {
     return this.http.post(this.localUrl + 'Save', this.SIitemMapping);
   }
   Delete(index)
   {
     return this.http.delete(this.localUrl + 'Delete/' + index);
   }
   GetOne(index){
     return this.http.get(this.localUrl + 'Find/' + index);
   }
 }

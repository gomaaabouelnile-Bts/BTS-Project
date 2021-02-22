
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUnitMapping } from 'src/app/Interface/Codes/IUnitMapping ';
import { GlobalAPIURLService } from '../global-apiurl.service';
@Injectable({
    providedIn: 'root'
  })
export class UnitMappingservice {

   SUnitMapping: IUnitMapping;
   SUnitMappingList: IUnitMapping[];
   constructor(private http: HttpClient, private GlobalAPI: GlobalAPIURLService) { }

    // tslint:disable-next-line:quotemark
    localUrl = this.GlobalAPI.URLAPI + "UnitsMapping/";
   GetAlldata()
   {
     return this.http.get<IUnitMapping[]>(this.localUrl + 'Getall');
   }
   Getdata()
   {
     return this.http.get(this.localUrl + 'Getall');
   }
   putData()
   {
     return this.http.put(this.localUrl + 'Update', this.SUnitMapping);
   }

   postData()
   {
     return this.http.post(this.localUrl + 'Save', this.SUnitMapping);
   }
   Delete(index)
   {
     return this.http.delete(this.localUrl + 'Delete/' + index);
   }
   GetOne(index){
     return this.http.get(this.localUrl + 'Find/' + index);
   }
 }

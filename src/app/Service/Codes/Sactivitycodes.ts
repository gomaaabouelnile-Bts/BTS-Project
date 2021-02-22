
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iactivitycodes } from 'src/app/Interface/Codes/IactivityCodes';
import { GlobalAPIURLService } from '../global-apiurl.service';
@Injectable({
    providedIn: 'root'
  })
export class Activitycodesservice {

   SIactivitycodes: Iactivitycodes;
   SIactivitycodesList: Iactivitycodes[];
   constructor(private http: HttpClient, private GlobalAPI: GlobalAPIURLService) { }

    localUrl = this.GlobalAPI.URLAPI + "ActivityCodes/";
   GetAlldata()
   {
     return this.http.get<Iactivitycodes[]>(this.localUrl + 'Getall',this.GlobalAPI.httpOptions);
   }
   Getdata()
   {
     return this.http.get(this.localUrl + 'Getall',this.GlobalAPI.httpOptions);
   }
   putData()
   {
     return this.http.put(this.localUrl + 'Update', this.SIactivitycodes,this.GlobalAPI.httpOptions);
   }

   postData()
   {
     return this.http.post(this.localUrl + 'Save', this.SIactivitycodes,this.GlobalAPI.httpOptions);
   }
   Delete(index)
   {
     return this.http.delete(this.localUrl + 'Delete/' + index,this.GlobalAPI.httpOptions);
   }
   GetOne(index){
     return this.http.get(this.localUrl + 'Find/' + index,this.GlobalAPI.httpOptions);
   }
 }

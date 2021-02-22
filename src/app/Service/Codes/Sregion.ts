
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iregion } from 'src/app/Interface/Codes/Iregion';
import { GlobalAPIURLService } from '../global-apiurl.service';
@Injectable({
    providedIn: 'root'
  })
export class Regionservice {

   SIregion: Iregion;
   SIregionList: Iregion[];
   constructor(private http: HttpClient, private GlobalAPI: GlobalAPIURLService) { }

    localUrl = this.GlobalAPI.URLAPI + 'Regions/';
   GetAlldata()
   {
     return this.http.get<Iregion[]>(this.localUrl + 'Getall');
   }
   Getdata()
   {
     return this.http.get(this.localUrl + 'Getall');
   }

   FindByG(index)
   {
     return this.http.get<Iregion[]>(this.localUrl + 'FindByG/' + index);
   }
   putData()
   {
     return this.http.put(this.localUrl + 'Update', this.SIregion);
   }

   postData()
   {
     return this.http.post(this.localUrl + 'Save', this.SIregion);
   }
   Delete(index)
   {
     return this.http.delete(this.localUrl + 'Delete/' + index);
   }
   GetOne(index){
     return this.http.get(this.localUrl + 'Find/' + index);
   }
 }

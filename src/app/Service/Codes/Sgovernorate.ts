
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Igovernorate } from 'src/app/Interface/Codes/Igovernorate';
import { GlobalAPIURLService } from '../global-apiurl.service';
@Injectable({
    providedIn: 'root'
  })
export class Governorateservice {

   SIgovernorate: Igovernorate;
   SIgovernorateList: Igovernorate[];
   constructor(private http: HttpClient, private GlobalAPI: GlobalAPIURLService) { }

    localUrl = this.GlobalAPI.URLAPI + "Governorates/";
   GetAlldata()
   {
     return this.http.get<Igovernorate[]>(this.localUrl + 'Getall');
   }
   FindbyG(index)
   {
     return this.http.get<Igovernorate[]>(this.localUrl + 'FindbyG/'+index);
   }
   Getdata()
   {
     return this.http.get(this.localUrl + 'Getall');
   }
   putData()
   {
     return this.http.put(this.localUrl + 'Update', this.SIgovernorate);
   }

   postData()
   {
     return this.http.post(this.localUrl + 'Save', this.SIgovernorate);
   }
   Delete(index)
   {
     return this.http.delete(this.localUrl + 'Delete/' + index);
   }
   GetOne(index){
     return this.http.get(this.localUrl + 'Find/' + index);
   }
 }

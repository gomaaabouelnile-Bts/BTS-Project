import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Program } from 'src/app/Interface/Security/Program.Interface';
import { GlobalAPIURLService } from '../global-apiurl.service';

@Injectable({
  providedIn: 'root'
})
export class ProgSericeService {

  Progarm: Program;
  localUrl = this.GlobalAPI.URLAPI + 'Program';
   // localUrl = 'http://151.106.34.109:7040/api/Program/Get';
   constructor(private http: HttpClient, private GlobalAPI: GlobalAPIURLService) {
    
    }
  
   
  getmenu(username)
  {
    
    return this.http.get<Program[]>(this.localUrl + '/Get' + '/' + username);
  }

  getProg()
  {
    return this.http.get<Program[]>(this.localUrl + '/Get');
  }
}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Igroup } from 'src/app/Interface/Security/group-Interface';
import { IgroupPermission } from 'src/app/Interface/Security/IgroupPermission';

import { GlobalAPIURLService } from '../global-apiurl.service';
@Injectable({
    providedIn: 'root'
  })
export class GroupPermissionService {
    // localUrl = 'http://151.106.34.109:7040/api/Groups/';
   Sergroup: IgroupPermission;
   SergroupList: IgroupPermission[];
   constructor(private http: HttpClient, private GlobalAPI: GlobalAPIURLService) { }

    localUrl = this.GlobalAPI.URLAPI + 'GroupPermission/';
   GetAlldata(id, pro)
   {
       console.log(this.localUrl + 'get/' + id + '/' + pro);
       return this.http.get<IgroupPermission>(this.localUrl + 'get/' + id + '/' + pro);
   }






 }

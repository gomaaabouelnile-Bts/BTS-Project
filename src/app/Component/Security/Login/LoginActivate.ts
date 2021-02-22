import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

import { GroupPermissionService } from 'src/app/Service/Security/SgroupPermission';



@Injectable()
export class LoginActivate implements CanActivate {
  login?: string ;
  helper = new JwtHelperService();

  constructor(private router: Router, private  objroupPermission: GroupPermissionService
     ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {

    if (localStorage.getItem('jwt') === null ||
    localStorage.getItem('jwt').toString().trim() === ''
   )
   {
    this.router.navigate(['LogIn']);
   }

    const token = localStorage.getItem('jwt');
    if (this.helper.isTokenExpired(token))
    {
      this.router.navigate(['LogIn']);
    }

    if (localStorage.getItem('GroupID') === null ||
     localStorage.getItem('GroupID').toString().trim() === ''
    )
    {
      this.router.navigate(['LogIn']);
    }

    if (route.data.title != null)
{
    this.objroupPermission.GetAlldata(localStorage.getItem('GroupID'), route.data.title)
    .subscribe(res => {
      localStorage.setItem('GroupDelete', res.groupDelete ? '1' : '0');
      localStorage.setItem('GroupEdit', res.groupEdit ? '1' : '0');
      localStorage.setItem('GroupInsert', res.groupInsert ? '1' : '0');
    });
  }

    return true;
  }

}

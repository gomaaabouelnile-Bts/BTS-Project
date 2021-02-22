import { Component, OnInit, TemplateRef } from '@angular/core';
import { Program } from '../Interface/Security/Program.Interface';
import { ProgSericeService } from '../Service/Security/prog-serice.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
   islogin = false;
   isActive: boolean;
   collapsed: boolean;
   showMenu: string;
   pushRightClass: string;
   username='';
   progmenu: Program[] = [];
  constructor( private progservice: ProgSericeService) {
    if (  localStorage.getItem('username') != null && localStorage.getItem('username').toString() !== '')
    {
      this.username=localStorage.getItem('username').toString().substring(0,10);
      this. islogin = true;
      this.getallmenudata();
    }
    else { this.islogin = false;

    }

}
getallmenudata()
{
    this.progservice.getmenu(localStorage.getItem('username'))
    .subscribe(data => {
        this.progmenu = data;
        });
      }
   Logout()
   {
    localStorage.setItem('username', '');
    localStorage.setItem('GroupID', '0');
    localStorage.setItem('userid', '');
    localStorage.removeItem('jwt');
    window.location.replace('');
   }

  ngOnInit() {
  }
  getchidList(progid)
  {
      return this.progmenu.filter(x => x.parentID == progid);
  }
  getParentList()
  {
return this.progmenu.filter(x => x.parentID == 0);
  }

}

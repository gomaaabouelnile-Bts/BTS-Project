import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IApi } from 'src/app/Interface/Views/IApi';
import { UserService } from 'src/app/Service/Security/users-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit { 	1;

  InvalidLogin: boolean;
  isSubmitted: any;
obapi:IApi;
  constructor(public AdminServ: UserService,public http: HttpClient) { }

  ngOnInit(): void {
    this.reset();
    this.getJSON().subscribe(data => {
      this.obapi=data;
      console.log( this.obapi.apiUrl);
    
      
  });
  }
  public getJSON(): Observable<any> {
    return this.http.get<IApi>("./assets/Api.json");
}
  getFileData() {
    return this.http.get('/assets/Api.json')
      .pipe(
        switchMap((response: any) => this.http.get(response.pathToFile, {
          responseType: 'text'
          
        }))
      );
  }
  reset() {
    this.AdminServ.Seruser = {
     address: '',
     groupId: null,
     id: 0,
     mobile1: '',
     mobile: '',
     name: '',
     nameLat: '',
     password: '',
     userName: '',


    };
    this.AdminServ.loguser={
      userName:'',
      password:'',
    };
  }

  onSubmit() {

if (this.AdminServ.Seruser.password !== '' &&
    this.AdminServ.Seruser.userName !== '') {
     this. AdminServ.loguser.userName = this.AdminServ.Seruser.userName ;
     this. AdminServ.loguser.password = this.AdminServ.Seruser.password ;
     this.AdminServ.postdatasecure().subscribe(res => {

      const token = (<any>res).token;
      console.log(token);
      localStorage.setItem('jwt', token);
      if (res != null) {
        this.AdminServ.GetLogin(this.AdminServ.Seruser.userName).subscribe(res2 =>
          {
            this.InvalidLogin = false;
            localStorage.setItem('username', res2.userName);
            localStorage.setItem('GroupID', res2.groupId.toString());
            localStorage.setItem('userid', res2.id.toString());
            localStorage.setItem('textDir','ltr');
            console.log(res);

            window.location.replace('');
          }
        );

        }
        else {
          alert('Invalid password or username');
          this.InvalidLogin = true;
          localStorage.setItem('username', '');
          localStorage.setItem('GroupID', '0');
          localStorage.setItem('userid', '');
          localStorage.removeItem('jwt');
        }
      });
    }
    else {
    alert('Please enter password and username');
    }
  }

}

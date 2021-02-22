import { Component, Renderer2, ElementRef, ViewChild, OnInit, HostListener, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Observable , of as observableOf, Observer, of} from 'rxjs';
//import { LoginActivate } from './component/login/LoginActivate';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {


  constructor(
    ) {
      localStorage.setItem('textDir','ltr');
    }
    ngOnInit(): void {
    }

}

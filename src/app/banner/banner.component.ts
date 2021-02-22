import { Component, OnInit } from '@angular/core';

declare var $:any;
import 'jquery';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    $(function () {
      'use strict';
      var winh = $(window).height();
      $('.slider,.carousel-item').height(winh );
  
  });


    
  }

}

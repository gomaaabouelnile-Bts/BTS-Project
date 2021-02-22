import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-our-audiences',
  templateUrl: './our-audiences.component.html',
  styleUrls: ['./our-audiences.component.css']
})
export class OurAudiencesComponent implements OnInit {
  islog = false;
  constructor() { 

    
    if (localStorage.getItem('username') != null && localStorage.getItem('username').toString() !== '')
    {
      this.islog=true;
    }
    else this.islog=false;


  }

  ngOnInit(): void {
  }

}

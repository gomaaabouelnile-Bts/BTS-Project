
import { Component, OnInit , ViewChild, TemplateRef} from '@angular/core';

import { NgForm } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { Companyservice } from 'src/app/Service/Codes/Scompany';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Countryservice } from 'src/app/Service/Codes/SCountry';
import { Activitycodesservice } from 'src/app/Service/Codes/Sactivitycodes';
import { Iactivitycodes } from 'src/app/Interface/Codes/IactivityCodes';
import { Governorateservice } from 'src/app/Service/Codes/Sgovernorate';
import { Regionservice } from 'src/app/Service/Codes/Sregion';
import {
  saveAs as importedSaveAs
} from 'file-saver';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  rowData: any;
  imageUrl: any;
  public response: { dbPath: '' };
  CountryId: [] ;
  governoratelist = [];
  regionlist = [];
  activityCode: Iactivitycodes[];
  insert = false;
  countryList: any;
  imagehide = true;
  activityCodeList: any;
  Data: any;
  public defaultColDef;
  private gridApi;
  isSubmitted = false;
  rowSelection = 'single';
  title: string;
  modalRef: BsModalRef;
  GroupDelete = '0';
  GroupInsert = '1';
  GroupEdit = '1';
  @ViewChild('agGrid') agGrid: AgGridAngular;
  @ViewChild('template') template: TemplateRef<any>;
  public Rtl = localStorage.getItem('textDir') === 'ltr' ? false : true;
  columnDefs = [
    {headerName: this.Rtl ? 'id' : 'ID', field: 'companyCode',  width: 100 , sortable: true, filter: true},
    {headerName: this.Rtl ? 'الاسم العربى' : 'Company Arabic Name', field: 'companyName',  width: 400 , sortable: true, filter: true},
    {headerName: this.Rtl ? 'الاسم الانجليزى' : 'Company English Name', field: 'companyEngName',  width: 400 , sortable: true, filter: true},
    {headerName: this.Rtl ? 'branchID' : 'branch ID', field: 'branchID',  width: 200 , sortable: true, filter: true}
  ];


  constructor(public objServ: Companyservice, private spinner: NgxSpinnerService
    ,         private translate: TranslateService, private modalService: BsModalService
    ,         private   objCountry: Countryservice, private objActivitycode: Activitycodesservice
    ,         private   objRegionservice: Regionservice,
              private   objGovernorates: Governorateservice
    ,         private sanitizer: DomSanitizer
    ) {
   
      this.reset();
      this.defaultColDef = { resizable: true };
    /*   this.objCountry.GetAlldata().subscribe(res => {
        this.countryList = res;
      }); */
      this.objActivitycode.GetAlldata().subscribe(res => {
        this.activityCodeList = res;
      });
    /*   this.objGovernorates.GetAlldata().subscribe(res => {
        this.governoratelist = res;
      }); */

  }
  ngOnInit(): void {
/*     if (localStorage.getItem('GroupDelete') != null ||
    localStorage.getItem('GroupDelete').toString().trim() !== ''

   )
   {
   this.GroupDelete = localStorage.getItem('GroupDelete');
   }
    if (localStorage.getItem('GroupInsert') != null ||
   localStorage.getItem('GroupInsert').toString().trim() !== ''

  )
  {
       this.GroupInsert = localStorage.getItem('GroupInsert').toString();
  }
    if (localStorage.getItem('GroupEdit') != null ||
  localStorage.getItem('GroupEdit').toString().trim() !== ''

 )
 {
this.GroupEdit = localStorage.getItem('GroupEdit');

 }  */
  
  }






  onrowDoubleClicked(params) {
if (this.GroupEdit === '0') {
return;
}
this.UpdateRecord();

   }
   CancelSave() {
    this.insert = false;
    this.reset();
    this.gridApi?. deselectAll();

  }
  reset()
  {
    this.objServ.SIcompany =
    {
     branchID:'',
     activityCode:'',
     additionalInformation:'',
     buildingNumber:'',
     companyCode:0,
     companyEngName:'',
     companyName:'',
     countryName:'',
     floor:'',
     governorateName:'',
     landmark:'',
     postalCode:'',
     regionName:'',
     registrationDate:null,
     room:'',
     street:'',
     taxID:'',
     taxRegistrationNumber:''



    };
    this.gridApi?. deselectAll();

  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.rowData = this.objServ.Getdata();

  }
  Addnewrecord()
  {
    this.reset();
    this.imagehide = true;
    this.insert = true;
  }
  UpdateRecord()
  {
    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows != null && selectedRows.length === 1)
    {
      this.imagehide = false;

      this.objServ.SIcompany = selectedRows [0];
      this.insert = true;
    }
    else
    {
      alert('Must select Record to edit');
    }
  }
  onSelectionChanged(params) {

    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows != null && selectedRows.length === 1)
    {
    this.objServ.SIcompany = selectedRows [0];
    }
  }
  onChangeSelectionactivityCode(params) {

   
    this.objServ.SIcompany.activityCode = params;
    
  }
  hide()
  {
    this. modalRef.hide();
  }
  onSubmit(f: NgForm)
  {

    this.spinner.show();
    this.isSubmitted = f.invalid;
    console.log( f);
  
    if (!this.isSubmitted)
    {

      if (this.objServ.SIcompany.companyCode == null || this.objServ.SIcompany.companyCode === 0)
      {

        this.objServ.postData().subscribe(res => {
          this.rowData = this.objServ.Getdata();
          this.insert = false;
          setTimeout(() => {
          this.spinner.hide();
        }, 1000);

        }
        , err => {
        console.log(err);
        setTimeout(() => {

        this.spinner.hide();
        }, 1000);
        });
        }
      else
      {

        this.objServ.putData().subscribe(res => {
          this.rowData = this.objServ.Getdata();
          this.insert = false;
          setTimeout(() => {
          this.spinner.hide();
          }, 1000);
          this.insert = false;
        }
        , err => {
          console.log(err);
          setTimeout(() => {
            this.spinner.hide();
          }, 1000);
        } );
      }
    }
    setTimeout(() => {

  this.spinner.hide();
  }, 1000);

  }

  Delete(index: number)
  {
    if (confirm('Are You Sure ?'))
    {
      this.objServ.Delete(index).subscribe((data) =>
      {
        this.rowData = this.objServ.Getdata();
        this.insert = false;
      });
    }

  }
}

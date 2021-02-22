
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
import { Customerservice } from 'src/app/Service/Codes/Scustomer';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  rowData: any;
  CountryId: [] ;
  governoratelist = [];
  regionlist = [];
  activityCode: Iactivitycodes[];
  insert = false;
  countryList: any;
  activityCodeList: any;
  Data: any;
  public defaultColDef;
  private gridApi;
  isSubmitted = false;
  rowSelection = 'single';
  title: string;
  modalRef: BsModalRef;

  @ViewChild('agGrid') agGrid: AgGridAngular;
  @ViewChild('template') template: TemplateRef<any>;
  public Rtl = localStorage.getItem('textDir') === 'ltr' ? false : true;
  columnDefs = [
    {headerName: this.Rtl ? 'id' : 'ID', field: 'customerCode',  width: 100 , sortable: true, filter: true},
    {headerName: this.Rtl ? 'الاسم العربى' : 'Customer Arabic Name', field: 'customerName',  width: 400 , sortable: true, filter: true},
    {headerName: this.Rtl ? 'الاسم الانجليزى' : 'Customer English Name', 
    field: 'customerEngName',  width: 400 , sortable: true, filter: true}
  ];


  constructor(public objServ: Customerservice, private spinner: NgxSpinnerService
    ,         private translate: TranslateService, private modalService: BsModalService
    ,         private   objCountry: Countryservice, private objActivitycode: Activitycodesservice
    ,         private   objRegionservice: Regionservice,
              private   objGovernorates: Governorateservice
    ) {
      this.defaultColDef = { resizable: true };


      this.objCountry.GetAlldata().subscribe(res => {
        this.countryList = res;

      });
      this.objActivitycode.GetAlldata().subscribe(res => {
        this.activityCodeList = res;
      });
      this.objGovernorates.GetAlldata().subscribe(res => {
        this.governoratelist = res;
      });

  }
  ngOnInit(): void {
    this.reset();
  }
  onChangeSelectioncountryID(selected) {
    console.log('dfdfdfd');
    this.objGovernorates.FindbyG(selected).subscribe(res => {
      this.governoratelist = res;
      if (this.governoratelist != null && this.governoratelist.length > 0) {
      this.onChangegovernorateSerial(this.governoratelist[0].governorateserial);
      }
      else{
      this.regionlist = [];
      }
    });
  }

  onChangegovernorateSerial(selected) {
    this.objServ.SIcustomer.governorateCode = selected;
    if( selected!= null) {
    this.objRegionservice.FindByG(selected).subscribe(res => {
      this.regionlist = res;
    });
    }
  }
  onChangeregionSerial(selected) {
    this.objServ.SIcustomer.regionCode = selected;
  }

  onrowDoubleClicked(params) {

    this.UpdateRecord();
    console.log(this.objServ.SIcustomer );
   }
   CancelSave() {
    this.insert = false;
    this.reset();
    this.gridApi?. deselectAll();

  }
  reset()
  {
    this.objServ.SIcustomer =
    {

      customerEngName: '',
      customerName: '',
      customerSerial: 0,
      customerCode: '',
      countryCode: '',
      governorateCode: '',
      regionCode: '',
       taxId: '0',
       additionalInformation: '',
       buildingNumber: '',
       floor: '', postalCode: '',
       room: '', street: '', landmark: '',
       vATExemptionYN: true
      ,countryName:'',
      governorateName:'',
      regionName:''


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
    this.insert = true;
  }
  UpdateRecord()
  {
    const selectedRows = this.gridApi.getSelectedRows();

    if (selectedRows != null && selectedRows.length === 1)
    {
      console.log(selectedRows[0]);
      this.onChangegovernorateSerial(selectedRows[0].governorateSerial);
      this.objServ.SIcustomer .regionCode=selectedRows[0].regionSerial;
      this.objServ.SIcustomer = selectedRows[0];

      console.log(this.objServ.SIcustomer);
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
    this.objServ.SIcustomer = selectedRows [0];
    }
  }
  hide()
  {
    this. modalRef.hide();
  }
  onSubmit(f: NgForm)
  {

    this.spinner.show();
    this.isSubmitted = f.invalid;
    if (!this.isSubmitted)
    {

      if (this.objServ.SIcustomer.customerSerial == null || this.objServ.SIcustomer.customerSerial === 0)
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

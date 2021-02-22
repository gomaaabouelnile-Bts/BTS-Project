import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AgGridAngular } from 'ag-grid-angular';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { Countryservice } from 'src/app/Service/Codes/SCountry';
import { Governorateservice } from 'src/app/Service/Codes/Sgovernorate';

@Component({
  selector: 'app-governorate',
  templateUrl: './governorate.component.html',
  styleUrls: ['./governorate.component.css']
})
export class GovernorateComponent implements OnInit {

  rowData: any;
  Data: any;
  countryList: any;
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
    { headerName: this.Rtl ? 'id' : 'id', field: 'governorateSerial', width: 0, sortable: true, filter: true },
    { headerName: this.Rtl ? 'كود البلد' : 'Country Code', field: 'countryCode', width: 150, sortable: true, filter: true },
    { headerName: this.Rtl ? 'الاسم العربى' : 'Governorate Name', field: 'governoratName', width: 150, sortable: true, filter: true },
    { headerName: this.Rtl ? 'الاسم الانجليزى' : 'Governorate Lat Name', field: 'governoratLatName', width: 200, sortable: true, filter: true },
  ];

  constructor(public GovernorateServ: Governorateservice, private spinner: NgxSpinnerService
    , private translate: TranslateService, private modalService: BsModalService, private objCountry: Countryservice) {
    this.defaultColDef = { resizable: true };
    this.objCountry.GetAlldata().subscribe(res => {
      this.countryList = res;

    });

  }
  ngOnInit(): void {
    this.reset();
    this.rowData = this.GovernorateServ.Getdata();
    // console.log(this.rowData);
  }
  onrowDoubleClicked(params) {

    this.UpdateRecord(this.template);


  }
  reset() {
    this.GovernorateServ.SIgovernorate =
    {
      countryCode: null,
      governoratName: null,
      governorateCode: '',
      governoratLatName: null,

    };
    this.gridApi?.deselectAll();

  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.rowData = this.GovernorateServ.Getdata();

  }
  Addnewrecord(template: TemplateRef<any>) {
    // console.log(this.rowData);
    this.reset();
    this.title = 'Add';
    this.modalRef = this.modalService.show(template);
  }
  UpdateRecord(template: TemplateRef<any>) {
    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows != null && selectedRows.length === 1) {
      this.GovernorateServ.SIgovernorate = selectedRows[0];
      this.title = 'Edit';
      this.modalRef = this.modalService.show(template);
    }
    else {
      alert('Must select Record to edit');
    }
  }
  onSelectionChanged(params) {

    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows != null && selectedRows.length === 1) {
      this.GovernorateServ.SIgovernorate = selectedRows[0];
    }
  }
  hide() {
    this.modalRef.hide();
  }
  onSubmit(f: NgForm) {

    this.spinner.show();
    this.isSubmitted = f.invalid;
    if (!this.isSubmitted) {

      if (this.GovernorateServ.SIgovernorate.governorateCode == null || 
        this.GovernorateServ.SIgovernorate.governorateCode != '') {

        this.GovernorateServ.postData().subscribe(res => {
          this.rowData = this.GovernorateServ.Getdata();
          this.hide();
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
      else {

        this.GovernorateServ.putData().subscribe(res => {
          this.rowData = this.GovernorateServ.Getdata();
          this.hide();
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
    }
    setTimeout(() => {

      this.spinner.hide();
    }, 1000);

  }

  onChangeSelectioncountryID(selected) {
    console.log(this.GovernorateServ.SIgovernorate.countryCode);
  }

  Delete(index: number) {
    if (confirm('Are You Sure ?')) {
      this.GovernorateServ.Delete(index).subscribe((data) => {
        this.rowData = this.GovernorateServ.Getdata();
        this.hide();
      });
    }

  }
}

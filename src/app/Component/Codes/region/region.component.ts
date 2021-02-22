import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AgGridAngular } from 'ag-grid-angular';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { Governorateservice } from 'src/app/Service/Codes/Sgovernorate';
import { Regionservice } from 'src/app/Service/Codes/Sregion';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {

  rowData: any;
  Data: any;
  GovernorateseList: any;
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
    { headerName: this.Rtl ? 'id' : 'id', field: 'regionSerial', width: 0, sortable: true, filter: true },
    { headerName: this.Rtl ? 'الاسم العربى' : 'Region Name', field: 'regionName', width: 150, sortable: true, filter: true },
    { headerName: this.Rtl ? 'الاسم الانجليزى' : 'Region Lat Name', field: 'regionEngName', width: 200, sortable: true, filter: true },
  ];

  constructor(public RegionServ: Regionservice, private spinner: NgxSpinnerService
    , private translate: TranslateService, private modalService: BsModalService, private GovernorateServ: Governorateservice) {
    this.defaultColDef = { resizable: true };
    this.GovernorateServ.GetAlldata().subscribe(res => {
      this.GovernorateseList = res;

    });

  }
  ngOnInit(): void {
    this.reset();
    this.rowData = this.RegionServ.Getdata();
    // console.log(this.rowData);
  }
  onrowDoubleClicked(params) {

    this.UpdateRecord(this.template);


  }
  reset() {
    this.RegionServ.SIregion =
    {
      governorateCode: '',
      regionName: null,
      regionCode: '',
      regionEngName: null,

    };
    this.gridApi?.deselectAll();

  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.rowData = this.RegionServ.Getdata();

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
      this.RegionServ.SIregion = selectedRows[0];
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
      this.RegionServ.SIregion = selectedRows[0];
    }
  }
  hide() {
    this.modalRef.hide();
  }
  onSubmit(f: NgForm) {

    this.spinner.show();
    this.isSubmitted = f.invalid;
    if (!this.isSubmitted) {
      console.log(this.RegionServ.SIregion);
      if (this.RegionServ.SIregion.regionCode == null || this.RegionServ.SIregion.regionCode === '') {

        console.log(this.RegionServ.SIregion);
        
        this.RegionServ.postData().subscribe(res => {
          this.rowData = this.RegionServ.Getdata();
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

        this.RegionServ.putData().subscribe(res => {
          this.rowData = this.RegionServ.Getdata();
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
    this.RegionServ.SIregion.governorateCode=selected;
    console.log(this.RegionServ.SIregion.governorateCode);
  }

  Delete(index: number) {
    if (confirm('Are You Sure ?')) {
      this.RegionServ.Delete(index).subscribe((data) => {
        this.rowData = this.RegionServ.Getdata();
        this.hide();
      });
    }

  }
}


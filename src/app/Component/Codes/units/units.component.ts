import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AgGridAngular } from 'ag-grid-angular';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { SunitService } from 'src/app/Service/Codes/sunit.service';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.css']
})
export class UnitsComponent implements OnInit {

  rowData: any;
  Update: boolean;
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
    { headerName: this.Rtl ? 'unit Code' : 'Unit Code', field: 'unitCode', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'الاسم العربى' : 'Unit Arabic Name', field: 'unitName', width: 250, sortable: true, filter: true },
    { headerName: this.Rtl ? 'الاسم الانجليزى' : 'Unit English Name', field: 'unitEngName', width: 250, sortable: true, filter: true }
  ];

  constructor(public UnitServ: SunitService, private spinner: NgxSpinnerService
    ,         private translate: TranslateService, private modalService: BsModalService) {
    this.defaultColDef = { resizable: true };

  }
  ngOnInit(): void {
    this.reset();
    this.rowData = this.UnitServ.Getdata();
    // console.log(this.rowData);
  }
  onrowDoubleClicked(params) {

    this.UpdateRecord(this.template);
    this.Update = true;


  }
  reset() {
    this.UnitServ.SIuints =
    {
      unitCode: null,
      unitName: null,
      unitEngName: null,

    };
    this.gridApi?.deselectAll();

  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.rowData = this.UnitServ.Getdata();

  }
  Addnewrecord(template: TemplateRef<any>) {
    // console.log(this.rowData);
    this.reset();
    this.title = 'Add';
    this.modalRef = this.modalService.show(template);
    this.Update = false;
  }
  UpdateRecord(template: TemplateRef<any>) {
    const selectedRows = this.gridApi.getSelectedRows();
    this.Update = true;
    if (selectedRows != null && selectedRows.length === 1) {
      this.UnitServ.SIuints = selectedRows[0];
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
      this.UnitServ.SIuints = selectedRows[0];
    }
  }
  hide() {
    this.modalRef.hide();
  }
  onSubmit(f: NgForm) {

    this.spinner.show();
    this.isSubmitted = f.invalid;
    if (!this.isSubmitted) {

      if (!this.Update) {

        this.UnitServ.postData().subscribe(res => {
          this.rowData = this.UnitServ.Getdata();
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

        this.UnitServ.putData().subscribe(res => {
          this.rowData = this.UnitServ.Getdata();
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

  Delete(index: number) {
    if (confirm('Are You Sure ?')) {
      this.UnitServ.Delete(index).subscribe((data) => {
        this.rowData = this.UnitServ.Getdata();
        this.hide();
      });
    }

  }
}

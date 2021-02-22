import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AgGridAngular } from 'ag-grid-angular';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { SunitService } from 'src/app/Service/Codes/sunit.service';
import { UnitMappingservice } from 'src/app/Service/Codes/SUnitMapping';

@Component({
  selector: 'app-unit-mapping',
  templateUrl: './unit-mapping.component.html',
  styleUrls: ['./unit-mapping.component.css']
})
export class UnitMappingComponent implements OnInit {
  rowData: any;
  Update: boolean;
  Data: any;
  public defaultColDef;
  private gridApi;
  isSubmitted = false;
  rowSelection = 'single';
  title: string;
  eInvoiceCurrencyList: any;
  modalRef: BsModalRef;
  @ViewChild('agGrid') agGrid: AgGridAngular;
  @ViewChild('template') template: TemplateRef<any>;
  public Rtl = localStorage.getItem('textDir') === 'ltr' ? false : true;
  columnDefs = [
    { headerName: this.Rtl ? 'unit Code' : 'Serial', field: 'unitSerial', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'الاسم العربى' : 'ERP Unit Code', field: 'erpUnitCode', width: 250, sortable: true, filter: true },
    { headerName: this.Rtl ? 'الاسم الانجليزى' : 'e-Invoice Unit Code', field: 'eInvoiceUnitCode', width: 250, sortable: true, filter: true }
  ];

  constructor(public objServ: UnitMappingservice, private spinner: NgxSpinnerService
    ,         private translate: TranslateService, private modalService: BsModalService
    ,         public objcuur: SunitService) {
    this.defaultColDef = { resizable: true };
    this.objcuur.GetAlldata().subscribe(res =>
      {
this.eInvoiceCurrencyList = res;

      }
    );

  }
  ngOnInit(): void {
    this.reset();
    this.rowData = this.objServ.Getdata();
    // console.log(this.rowData);
  }
  onChangeSelection(select) {
    this.objServ.SUnitMapping .eInvoiceUnitCode = select;

  }
  onrowDoubleClicked(params) {

    this.UpdateRecord(this.template);
    this.Update = true;


  }
  reset() {
    this.objServ.SUnitMapping =
    {
      eInvoiceUnitCode: '',
      unitSerial: 0,
      erpUnitCode: '',

    };
    this.gridApi?.deselectAll();

  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.rowData = this.objServ.Getdata();

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
      this. objServ.SUnitMapping.eInvoiceUnitCode = selectedRows[0].eInvoiceCurrencyCode;
      this.objServ.SUnitMapping = selectedRows[0];
      
      this.title = 'Edit';
      this.modalRef = this.modalService.show(template);
    }
    else {
      alert('Must select Record to edit');
    }
  }
  onSelectionChanged(params) {

    const selectedRows = this.gridApi.getSelectedRows();
  
  }
  hide() {
    this.modalRef.hide();
  }
  onSubmit(f: NgForm) {

    this.spinner.show();
    this.isSubmitted = f.invalid;
    if (!this.isSubmitted) {

      if (!this.Update) {
        console.log( this.objServ.SUnitMapping );
        this.objServ.postData().subscribe(res => {
          this.rowData = this.objServ.Getdata();
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

        this.objServ.putData().subscribe(res => {
          this.rowData = this.objServ.Getdata();
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
      this.objServ.Delete(index).subscribe((data) => {
        this.rowData = this.objServ.Getdata();
        this.hide();
      });
    }

  }
}

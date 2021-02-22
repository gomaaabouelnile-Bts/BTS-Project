import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AgGridAngular } from 'ag-grid-angular';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { STransactionStatusService } from 'src/app/Service/Codes/stransaction-status.service';

@Component({
  selector: 'app-transaction-status',
  templateUrl: './transaction-status.component.html',
  styleUrls: ['./transaction-status.component.css']
})
export class TransactionStatusComponent implements OnInit {

  rowData: any;
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
    { headerName: this.Rtl ? 'id' : 'id', field: 'transactionStatusCode', width: 0, sortable: true, filter: true },
    { headerName: this.Rtl ? 'الاسم العربى' : 'Transaction Status Name', field: 'transactionStatusName', width: 150, sortable: true, filter: true },
    { headerName: this.Rtl ? 'الاسم الانجليزى' : 'Transaction Status Lat Name', field: 'transactionStatusEngName', width: 200, sortable: true, filter: true }
  ];

  constructor(public STransactionStatusServ: STransactionStatusService, private spinner: NgxSpinnerService
    , private translate: TranslateService, private modalService: BsModalService) {
    this.defaultColDef = { resizable: true };

  }
  ngOnInit(): void {
    this.reset();
    this.rowData = this.STransactionStatusServ.Getdata();
    // console.log(this.rowData);
  }
  onrowDoubleClicked(params) {

    this.UpdateRecord(this.template);


  }
  reset() {
    this.STransactionStatusServ.SITransactionStatus =
    {
      transactionStatusCode:0,
      transactionStatusName: null,
      transactionStatusEngName: null,

    };
    this.gridApi?.deselectAll();

  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.rowData = this.STransactionStatusServ.Getdata();

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
      this.STransactionStatusServ.SITransactionStatus = selectedRows[0];
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
      this.STransactionStatusServ.SITransactionStatus = selectedRows[0];
    }
  }
  hide() {
    this.modalRef.hide();
  }
  onSubmit(f: NgForm) {

    this.spinner.show();
    this.isSubmitted = f.invalid;
    if (!this.isSubmitted) {

      if (this.STransactionStatusServ.SITransactionStatus.transactionStatusCode == null || this.STransactionStatusServ.SITransactionStatus.transactionStatusCode === 0) {

        this.STransactionStatusServ.postData().subscribe(res => {
          this.rowData = this.STransactionStatusServ.Getdata();
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

        this.STransactionStatusServ.putData().subscribe(res => {
          this.rowData = this.STransactionStatusServ.Getdata();
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
      this.STransactionStatusServ.Delete(index).subscribe((data) => {
        this.rowData = this.STransactionStatusServ.Getdata();
        this.hide();
      });
    }

  }
}

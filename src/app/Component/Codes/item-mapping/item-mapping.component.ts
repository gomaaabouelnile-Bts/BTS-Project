
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AgGridAngular } from 'ag-grid-angular';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ItemMappingservice } from 'src/app/Service/Codes/SItemMappings';
import { SItemsService } from 'src/app/Service/Codes/sitems.service';

@Component({
  selector: 'app-item-mapping',
  templateUrl: './item-mapping.component.html',
  styleUrls: ['./item-mapping.component.css']
})
export class ItemMappingComponent implements OnInit {
  rowData: any;
  Update: boolean;
  Data: any;
  public defaultColDef;
  private gridApi;
  isSubmitted = false;
  rowSelection = 'single';
  title: string;
  eInvoiceCurrencyList: any;
  mode= 0;
  modalRef: BsModalRef;
  @ViewChild('agGrid') agGrid: AgGridAngular;
  @ViewChild('template') template: TemplateRef<any>;
  public Rtl = localStorage.getItem('textDir') === 'ltr' ? false : true;
  columnDefs = [
    { headerName: this.Rtl ? 'unit Code' : 'ERP Item Code', field: 'erpItemCode', width: 250, sortable: true, filter: true },
    { headerName: this.Rtl ? 'الاسم العربى' : 'ERP Item Arabic Name', field: 'erpItemEngName', width: 300, sortable: true, filter: true },
    { headerName: this.Rtl ? 'الاسم الانجليزى' : 'e-Invoice GPC Code', field: 'eInvoiceItemGPC', width: 300, sortable: true, filter: true }
  ];

  constructor(public objServ: ItemMappingservice, private spinner: NgxSpinnerService
    ,         private translate: TranslateService, private modalService: BsModalService
    ,         public objcuur: SItemsService) {
    this.defaultColDef = { resizable: true };
    this.objcuur.GetAlldata().subscribe(res =>
      {
this.eInvoiceCurrencyList = res;

      }
    );

  }
  ngOnInit(): void {
    this.reset();

    // console.log(this.rowData);
  }
  onChangeSelection(select) {
    this.objServ.SIitemMapping .eInvoiceItemGPC = select;

  }
  onrowDoubleClicked(params) {

    this.UpdateRecord(this.template);
    this.Update = true;


  }
  reset() {
    this.mode = 0;
    this.objServ.SIitemMapping =
    {
      erpItemCode: '',
      eInvoiceItemGPC: '',
      erpItemEngName: '',
      erpItemName: '',
      erpItemUnitCode: '0'

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
    this.mode = 1;
    this.title = 'Add';
    this.modalRef = this.modalService.show(template);
    this.Update = false;
  }
  UpdateRecord(template: TemplateRef<any>) {
    this.mode = 0;
    const selectedRows = this.gridApi.getSelectedRows();
    this.Update = true;
    if (selectedRows != null && selectedRows.length === 1) {

      this.objServ.SIitemMapping = selectedRows[0];
      console.log( this.objServ.SIitemMapping);
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
        console.log( this.objServ.SIitemMapping );
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

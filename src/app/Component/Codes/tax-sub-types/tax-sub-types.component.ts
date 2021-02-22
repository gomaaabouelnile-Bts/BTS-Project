import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AgGridAngular } from 'ag-grid-angular';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { STaxSubTypesService } from 'src/app/Service/Codes/stax-sub-types.service';
import { STaxService } from 'src/app/Service/Codes/stax.service';

@Component({
  selector: 'app-tax-sub-types',
  templateUrl: './tax-sub-types.component.html',
  styleUrls: ['./tax-sub-types.component.css']
})
export class TaxSubTypesComponent implements OnInit {

  rowData: any;
  Update: boolean;
  Data: any;
  public defaultColDef;
  private gridApi;
  isSubmitted = false;
  rowSelection = 'single';
  title: string;
  TaxList: any;

  modalRef: BsModalRef;
  @ViewChild('agGrid') agGrid: AgGridAngular;
  @ViewChild('template') template: TemplateRef<any>;
  public Rtl = localStorage.getItem('textDir') === 'ltr' ? false : true;
  columnDefs = [
    { headerName: this.Rtl ? 'taxSubtype Code' : 'Tax Subtype Code', field: 'taxSubtypeCode', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'الاسم العربى' : 'Tax SubType Arabic Name', field: 'taxSubtypeName', width: 230, sortable: true, filter: true },
    { headerName: this.Rtl ? 'الاسم الانجليزى' : 'Tax SubType English Name', field: 'taxSubtypeEngName',
     width: 230, sortable: true, filter: true },
    { headerName: this.Rtl ? 'Tax Code' : 'Tax Code', field: 'taxCode', width: 200, sortable: true, filter: true },
  ];

  constructor(public STaxSubTypesServ: STaxSubTypesService, private spinner: NgxSpinnerService
    , private translate: TranslateService, private modalService: BsModalService, public STaxServ: STaxService) {
    this.defaultColDef = { resizable: true };

    this.STaxServ.GetAlldata().subscribe(res => {
      this.TaxList = res;
    });
  }
  ngOnInit(): void {
    this.reset();
    this.rowData = this.STaxSubTypesServ.Getdata();
    // console.log(this.rowData);
  }
  onrowDoubleClicked(params) {

    this.UpdateRecord(this.template);
    this.Update = true;


  }
  reset() {
    this.STaxSubTypesServ.SITaxSubTypes =
    {
      taxSubtypeCode: null,
      taxCode: null,
      taxSubtypeName: null,
      taxSubtypeEngName: null,

    };
    this.gridApi?.deselectAll();

  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.rowData = this.STaxSubTypesServ.Getdata();

  }
  Addnewrecord(template: TemplateRef<any>) {
    // console.log(this.rowData);
    this.Update = false
    this.reset();
    this.title = 'Add';
    this.modalRef = this.modalService.show(template);
  }
  UpdateRecord(template: TemplateRef<any>) {
    const selectedRows = this.gridApi.getSelectedRows();
    this.Update = true;
    if (selectedRows != null && selectedRows.length === 1) {
      this.STaxSubTypesServ.SITaxSubTypes = selectedRows[0];
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
      this.STaxSubTypesServ.SITaxSubTypes = selectedRows[0];
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

        console.log(this.STaxSubTypesServ.SITaxSubTypes);
        this.STaxSubTypesServ.postData().subscribe(res => {
          console.log(res);
          this.rowData = this.STaxSubTypesServ.Getdata();
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

        console.log(this.STaxSubTypesServ.SITaxSubTypes);
        this.STaxSubTypesServ.putData().subscribe(res => {
          this.rowData = this.STaxSubTypesServ.Getdata();
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
      this.STaxSubTypesServ.Delete(index).subscribe((data) => {
        this.rowData = this.STaxSubTypesServ.Getdata();
        this.hide();
      });
    }

  }

  onChangeSelectioncountryID(select) {
    this.STaxSubTypesServ.SITaxSubTypes.taxCode = select;
    console.log(this.STaxSubTypesServ.SITaxSubTypes.taxCode);
  }



}


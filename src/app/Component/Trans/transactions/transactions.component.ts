
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AgGridAngular } from 'ag-grid-angular';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { AgGridCheckboxComponent } from 'src/app/ag-grid-checkbox/ag-grid-checkbox.component';
import { transactionStatusservice } from 'src/app/Service/Codes/StransactionStatus';
import { TransactionsDService } from 'src/app/Service/Trans/VtransactionsD';
import { TransactionsHService } from 'src/app/Service/Trans/VtransactionsH';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  rowData: any;
  rowData2: any;


  insert = false;
 showyn= false;
  imagehide = true;

  Data: any;
  public defaultColDef;
  private gridApi;
  private gridApi2;
  isSubmitted = false;
  rowSelection = 'single';
  eDate: Date;
  rowSelection2 = 'single';
  displayItemNameList = '';
  title: string;
  modalRef: BsModalRef;
  public InvoiceStatusList: any;
  public Statusoice: any;
  GroupDelete = '0';
  GroupInsert = '0';
  GroupEdit = '0';
  @ViewChild('agGrid') agGrid: AgGridAngular;
  @ViewChild('agGrid') agGrid2: AgGridAngular;
  public Rtl = localStorage.getItem('textDir') === 'ltr' ? false : true;
  columnDefs = [
    {headerName: 'Select (Y/N)', cellRendererFramework: AgGridCheckboxComponent, field: 'selectyn'
  ,width: 110},
    {headerName: this.Rtl ? 'Extracted' :
    'Extracted', field: 'extracted',  width: 110 , sortable: true, filter: true},
    {headerName: this.Rtl ? 'Validated' :
    'Validated', field: 'validated',  width: 110 , sortable: true, filter: true},
    {headerName: this.Rtl ? 'TransactionStatusCode' :
    'TransactionStatusCode', field: 'transactionStatusCode',  width: 0, hide: true , sortable: true, filter: true}
    ,
    {headerName: this.Rtl ? 'Submitted' :
    'Submitted', field: 'submitted',  width: 110 , sortable: true, filter: true},
    {headerName: this.Rtl ? 'Transaction Type' : 'Transaction Type', field:
    'documentType',  width: 120 , sortable: true, filter: true},
  
    {headerName: this.Rtl ? 'Transaction Key' : 'Transaction Key', field: 'erpTransactionID',
    width: 130 , sortable: true,hide:true, filter: true},
    {headerName: this.Rtl ? 'Transaction Number' : 'Transaction Number', field: 'erpTransactionNumber',
    width: 130 , sortable: true, filter: true},
    {headerName: this.Rtl ? 'Transaction Date' : 'Transaction Date', field:
    'dateTimeIssued',  width: 120 , sortable: true, filter: true}
    ,
    {headerName: this.Rtl ? 'Customer Code' : 'Customer Code', field:
    'customerCode',  width: 150 , sortable: true, filter: true},
    {headerName: this.Rtl ? 'Customer Name' : 'Customer Name', field: 'customerName',
    width: 130 , sortable: true, filter: true}
    ,
    {headerName: this.Rtl ? 'Total  Amount' :
    'Total  Amount', field: 'totalAmount',  width: 150 , sortable: true, filter: true},
 
    {headerName: this.Rtl ? 'Customer Tax ID' :
    'Customer Tax ID', field: 'customerCodecustomerTaxId',  width: 150 , sortable: true, filter: true},

  ];
  columnDefs2 = [
    {headerName: this.Rtl ? 'internal Code' : 'ERP Item Code', field: 'internalCode',  width: 130 , sortable: true, filter: true},
    {headerName: this.Rtl ? 'Item Desc' : 'ERP Item Desc', field: 'erpItemDesc',  width: 120 , sortable: true, filter: true},
    {headerName: this.Rtl ? 'item Code' : 'GPC item Code', field: 'itemCode',hide:true,  width: 150 , sortable: true, filter: true},
    {headerName: this.Rtl ? 'quantity' :
    
    'Quantity', field: 'quantity',  width: 110 , sortable: true, filter: true},
    {headerName: this.Rtl ? 'Unit Price' :
    'Unit Price', field: 'unitPrice',  width: 150 , sortable: true, filter: true},
    {headerName: this.Rtl ? 'sales Total' :
    'Sales Total', field: 'salesTotal',  width: 150 , sortable: true, filter: true},
    {headerName: this.Rtl ? 'vAT Amount' :
    'VAT Amount ', field: 'vatAmount',  width: 150 , sortable: true, filter: true},

    {headerName: this.Rtl ? 'wHT Amount' :
    'WHT Amount ', field: 'whtAmount',  width: 150 , sortable: true, filter: true},
    {headerName: this.Rtl ? 'totalTaxableFees' :
    'TotalTaxableFees', field: 'totalTaxableFees',  width: 200 , sortable: true, filter: true,hide:true
  },
    {headerName: this.Rtl ? 'itemsDiscountAmount' :
    'Items Discount Amount', field: 'itemsDiscountAmount',  width: 200 , sortable: true, filter: true},
    {headerName: this.Rtl ? 'total' :
    'Total', field: 'total',  width: 200 , sortable: true, filter: true}
  ];
  constructor(public objServ: TransactionsHService, private spinner: NgxSpinnerService
    ,         private translate: TranslateService, private modalService: BsModalService
    ,         public objServ2: TransactionsDService,
              public onjtransactionStatusservice: transactionStatusservice

    ) {


      this.defaultColDef = { resizable: true };
      this.onjtransactionStatusservice.GetAlldata().subscribe(res => this.InvoiceStatusList = res
        );


  }
  ngOnInit(): void {
     if (localStorage.getItem('GroupDelete') != null ||
    localStorage.getItem('GroupDelete') !== ''

   )
   {
   this.GroupDelete = localStorage.getItem('GroupDelete');
   }

     if (localStorage.getItem('GroupInsert') != null ||
   localStorage.getItem('GroupInsert') !== ''

  )
  {
       this.GroupInsert = '0';
  }
     if (localStorage.getItem('GroupEdit') != null ||
  localStorage.getItem('GroupEdit') !== ''

 )
 {
this.GroupEdit = localStorage.getItem('GroupEdit');

 }
     this.reset();
  }

  ExtractTransaction()
  {
    this.displayItemNameList = '';
    if (confirm('Are You Sure , Extract Transaction?'))
    {
      this.spinner.show();
      this.objServ.GetTransaction()
      .subscribe(
        data => {
          this.rowData = this.objServ.GetallByS(1);
          alert('Done , No Extract Transaction   ' + data.length);
          setTimeout(() => {
            this.spinner.hide();
            }, 1000);
          this.objServ.LastExtractDate().subscribe(res =>
              this.eDate = res);
        },
        err => {
          setTimeout(() => {
            alert(err);
            this.spinner.hide();
            }, 1000);
        },
        () => console.log('yay')
      );
    }
  }
  ValidateTransactions()
  {
    if (confirm('Are You Sure , Validate Transaction?'))
    {
      this.spinner.show();
      const items = [];
      // tslint:disable-next-line: only-arrow-functions
      this.gridApi.forEachNode(function(node) {
        items.push(node.data);
      });
      var list;
      if(this.showyn)
      {
         list =  items.filter(x => x.transactionStatusCode === 1);
      }
      else{
         list =  items.filter(x => x.cbox && x.transactionStatusCode === 1);
      }
          
    

      if (list != null && list.length > 0)
      {

      this.objServ.Validation(list)
      .subscribe(
        data => {
          this.rowData = this.objServ.GetallByS(2);

          if (data != null && data.length > 0)
          {
            data.forEach(element => {
              this.displayItemNameList =
              this.displayItemNameList + '' +
              element.code + '_' + element.name + ' , ';
            });

          }
          else
          {
            this.displayItemNameList = '';
          }
          alert('Done , Validate Transaction   ');
          setTimeout(() => {
            this.spinner.hide();
            }, 1000);
        },
        err => {
          setTimeout(() => {
            alert(err);
            this.spinner.hide();
            }, 1000);
        },
        () => console.log('yay')
      );
    }
    else
    {
      alert('No Row Seleted');
      setTimeout(() => {
        this.spinner.hide();
        }, 1000);
    }
    }
  }
  SubmittoETA(){
    if (confirm('Are You Sure , Submit to ETA?'))
    {
      this.spinner.show();
      const items = [];
      // tslint:disable-next-line: only-arrow-functions
      this.gridApi.forEachNode(function(node) {
        items.push(node.data);
      });
      var list;
if(this.showyn)
{
   list =  items.filter(x => x.transactionStatusCode === 2);
}
else{
   list =  items.filter(x => x.cbox && x.transactionStatusCode === 2);
}
     

      if (list != null && list.length > 0)
      {

      this.objServ.SubmittoETA(list)
      .subscribe(
        data => {
          this.rowData = this.objServ.GetallByS(3);
          alert('Submit to ETA   ');
          setTimeout(() => {
            this.spinner.hide();
            }, 1000);
        },
        err => {
          setTimeout(() => {
            alert(err);
            this.spinner.hide();
            }, 1000);
        },
        () => console.log('yay')
      );
    }
    else
    {
      alert('No Row Seleted');
      setTimeout(() => {
        this.spinner.hide();
        }, 1000);
    }
    }

  }
  onChangeSelectionaInvoiceStatus(params) {
    this.displayItemNameList = '';
    if (params != null)
    {
    this.spinner.show();
    this.rowData = this.objServ.GetallByS(params);
    this.Statusoice = params;
    setTimeout(() => {
      this.spinner.hide();
      }, 1000);

    }
    else {
    this.rowData = this.objServ.GetallByS(0);
    }


  }
  onrowDoubleClicked(params) {
    this.displayItemNameList = '';
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
    this.displayItemNameList = '';
    this.objServ.StransactionsH =
    {

      transactionSerial: 0,
       additionalInformation: null,
       buildingNumber: null,
       floor: null, postalCode: null,
       room: null, street: null, landmark: null
       , countryName: null,
       customerName: null, customerTaxId: null, customerType: null,
       dateTimeIssued: null, documentType: null, eRPCurrencyCode: null,
       eRPCreationDateTime: null, exchangeRate: 0, extraDiscountAmount: 0, governorateName: null,
       netAmount: 0, ref: null, regionName: '',
       totalAmount: 0, totalDiscountAmount: 0, totalItemsDiscountAmount: 0, totalSalesAmount: 0,
       totalVAT: 0, totalWHT: 0, transactionDescription: '', ETAID: '',
       transactionStatusCode: 1, customerCode: '', erpTransactionID: ''


    };
    this.gridApi?. deselectAll();

  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.rowData = this.objServ.GetallByS(0);

    this.objServ.LastExtractDate().subscribe(res =>
      this.eDate = res);

  }
  onGridReady2(params) {
    this.gridApi2 = params.api;


  }
  Addnewrecord()
  {
    this.reset();
    this.imagehide = true;
    this.insert = true;
  }
  UpdateInvoiceStatus(){
    if (confirm('Are You Sure , Check Transaction Status?'))
    {
      this.spinner.show();

      this.objServ.UpdateInvoiceStatus()
      .subscribe(
        data => {
          this.rowData = this.objServ.GetallByS(2);
          alert('Check Transaction Done   ');
          setTimeout(() => {
            this.spinner.hide();
            }, 1000);
        },
        err => {
          setTimeout(() => {
            alert(err);
            this.spinner.hide();
            }, 1000);
        },
        () => console.log('yay')
      );
    
 
    }

  }
  eventCheck(event){
    console.log(this.showyn)
    const items = [];
    this.gridApi.forEachNode(function (node) {
      items.push(node.data);
    });

    for (const i in items) {
     items[i].selectyn=this.showyn;
     this.gridApi.api.updateRowData({

      updateRowData: [ items[i]]
    });

    }
    // tslint:disable-next-line: only-arrow-functions

 



}
  UpdateRecord()
  {
    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows != null && selectedRows.length === 1)
    {

      this.objServ.StransactionsH = selectedRows [0];
      this.rowData2 = this.objServ2.GetallByS(this.objServ.StransactionsH.erpTransactionID);
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
    this.objServ.StransactionsH = selectedRows [0];

    }
  }
  hide()
  {
    this. modalRef.hide();
  }
  onSubmit(f: NgForm)
  {




  }

  Delete(index: number)
  {
    if (confirm('Are You Sure ?'))
    {
      this.objServ.Delete(index).subscribe((data) =>
      {
        this.rowData = this.objServ.Delete(index);
        this.insert = false;
      });
    }

  }
}

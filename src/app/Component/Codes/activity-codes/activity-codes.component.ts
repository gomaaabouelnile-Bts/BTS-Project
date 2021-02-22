
import { Component, OnInit , ViewChild, TemplateRef} from '@angular/core';

import { NgForm } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { GroupService } from 'src/app/Service/Security/group-service';
import { Activitycodesservice } from 'src/app/Service/Codes/Sactivitycodes';


@Component({
  selector: 'app-activity-codes',
  templateUrl: './activity-codes.component.html',
  styleUrls: ['./activity-codes.component.css']
})
export class ActivityCodesComponent implements OnInit {

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
    {headerName: this.Rtl ? 'id' : 'id', field: 'activityCode',  width: 100 , sortable: true, filter: true},
    {headerName: this.Rtl ? 'الاسم العربى' : 'activity Name', field: 'activityName',  width: 400 , sortable: true, filter: true},
    {headerName: this.Rtl ? 'الاسم الانجليزى' : 'activity English Name', field: 'activityEngName',  width: 400 , sortable: true, filter: true}
  ];

  constructor(public objServ: Activitycodesservice, private spinner: NgxSpinnerService
    ,         private translate: TranslateService, private modalService: BsModalService) {
      this.defaultColDef = { resizable: true };

  }
  ngOnInit(): void {
    this.reset();
   
    // console.log(this.rowData);
  }
  onrowDoubleClicked(params) {

    this.UpdateRecord(this.template);

   }
  reset()
  {
    this.objServ.SIactivitycodes =
    {
      activityName: null,
      activityEngName: null,
      activityCode: '',

    };
    this.gridApi?. deselectAll();

  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.rowData = this.objServ.Getdata();

  }
  Addnewrecord(template: TemplateRef<any>)
  {
    // console.log(this.rowData);
    this.reset();
    this.title = 'Add';
    this.modalRef = this.modalService.show(template);
  }
  UpdateRecord(template: TemplateRef<any>)
  {
    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows != null && selectedRows.length === 1)
    {
    this.objServ.SIactivitycodes = selectedRows [0];
    this.title = 'Edit' ;
    this.modalRef = this.modalService.show(template);
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
    this.objServ.SIactivitycodes = selectedRows [0];
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

      if (this.objServ.SIactivitycodes.activityCode == null || this.objServ.SIactivitycodes.activityCode === '')
      {

        this.objServ.postData().subscribe(res => {
          this.rowData = this.objServ.Getdata();
        this. hide();
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
          this. hide();
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
        this.hide();
      });
    }

  }
}
